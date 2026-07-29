# CSAT Feedback System

A public feedback capture flow triggered from Freshdesk emoji-rating emails.

```
Freshdesk email (5 emojis, each a link)
        │  https://feedback.company.com/?ticket=12345&rating=5&subject=Cannot%20login
        ▼
feedback-website (React SPA)        →  reads ticket/rating/subject from the URL,
                                        shows them read-only, collects free-text
                                        + category checkboxes
        │  POST /api/feedback
        ▼
backend (Express API)               →  validates (Zod) → sanitizes → inserts
        │
        ▼
Neon Postgres — `feedback` table
```

## Repository layout

```
automated-email-ticket-rating-main/
├── package.json              # root: delegates via --prefix (matches TechCare's pattern, no npm workspaces)
├── backend/                  # Express + TypeScript API
│   ├── .env.example
│   └── src/
│       ├── server.ts             # app entrypoint: helmet, cors, morgan, routes, error handler
│       ├── config/
│       │   ├── env.ts            # typed process.env wrapper, fails fast if misconfigured
│       │   └── db.ts             # Neon client + schema (CREATE TABLE IF NOT EXISTS, source of truth)
│       ├── middlewares/
│       │   ├── validate.middleware.ts    # generic Zod request validator
│       │   ├── rateLimiter.middleware.ts # express-rate-limit on POST /api/feedback
│       │   └── errorHandler.middleware.ts
│       ├── routes/
│       │   └── feedback.route.ts
│       ├── controllers/feedback/
│       │   └── postRequests.controller.ts   # thin: req/res only
│       ├── services/
│       │   └── feedback.service.ts          # business logic + sanitize-html
│       ├── repositories/
│       │   └── feedback.repository.ts       # only file that touches Postgres directly
│       ├── validators/
│       │   └── feedback.validator.ts        # Zod schema (source of truth for input rules)
│       ├── types/
│       │   └── feedback.types.ts
│       └── utils/
│           ├── AppError.ts
│           └── asyncHandler.ts
└── feedback-website/          # React + Vite + TypeScript SPA
    ├── .env.example
    └── src/
        ├── App.tsx / main.tsx
        ├── pages/
        │   ├── FeedbackPage.tsx     # orchestrates URL parsing → form → success
        │   ├── ThankYouPage.tsx
        │   └── InvalidLinkPage.tsx
        ├── components/
        │   ├── CompanyLogo.tsx
        │   ├── TicketInfo.tsx        # read-only ticket id/subject
        │   ├── RatingBadge.tsx       # read-only emoji rating
        │   ├── FeedbackForm.tsx      # React Hook Form + Zod
        │   ├── CategoryCheckboxes.tsx
        │   ├── LoadingSpinner.tsx
        │   └── AlertBanner.tsx
        ├── hooks/
        │   └── useTicketParams.ts    # parses + validates ?ticket=&rating=&subject=
        ├── services/
        │   └── feedbackService.ts    # axios call to POST /api/feedback
        ├── lib/
        │   └── axios.ts              # shared axios instance
        └── types/
            ├── feedback.types.ts
            └── feedbackForm.schema.ts
```

## How the "prefill" flow works

The Freshdesk email template links each emoji to:

```
https://feedback.company.com/?ticket=12345&rating=5&subject=Cannot%20login%20to%20account
```

`rating` is baked into the URL per-emoji (1 for 😡 … 5 for 😄), and `subject`
carries the ticket title straight from the email template — no extra API
call is needed. `useTicketParams` reads all three query params once, on
mount, and:

- Rejects the page (shows `InvalidLinkPage`) if `ticket` or `rating` are
  missing/malformed.
- Passes `ticketId`, `rating`, and `subject` down as **props/read-only
  display data only** — they are never wired into the React Hook Form
  state, so there is no code path where they can be edited by the customer.

## Database schema

```sql
CREATE TABLE IF NOT EXISTS feedback (
  id            SERIAL PRIMARY KEY,
  ticket_id     BIGINT NOT NULL,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback      TEXT,
  categories    TEXT[] NOT NULL DEFAULT '{}',
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address    VARCHAR(45),
  user_agent    TEXT,
  CONSTRAINT feedback_ticket_id_unique UNIQUE (ticket_id)
);

CREATE INDEX IF NOT EXISTS idx_feedback_ticket_id ON feedback (ticket_id);
CREATE INDEX IF NOT EXISTS idx_feedback_submitted_at ON feedback (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback (rating);
```

`connectNeon()` in `backend/src/config/db.ts` runs this on every boot; there
is no separate migration step (same pattern as `CREATE TABLE IF NOT
EXISTS` — safe to re-run).

**Design decision:** `ticket_id` is `UNIQUE`. One rating per ticket. A
second submission for the same ticket returns `409 Conflict` with a clear
message instead of silently overwriting or duplicating rows. If your
Freshdesk flow needs to allow re-rating (e.g. ticket reopened), drop the
constraint and instead `UPSERT` (`ON CONFLICT (ticket_id) DO UPDATE`) in
`feedback.repository.ts`.

## API

### `POST /api/feedback`

```json
// Request
{
  "ticket_id": 12345,
  "rating": 5,
  "feedback": "Support was fast and friendly.",
  "categories": ["communication", "professionalism"]
}

// 201 Response
{ "success": true, "data": { "id": 1, "ticket_id": 12345, "submitted_at": "2026-07-29T10:00:00.000Z" } }

// 422 Validation error
{ "success": false, "error": "Validation failed", "details": [{ "field": "rating", "message": "rating must be between 1 and 5" }] }

// 409 Duplicate
{ "success": false, "error": "Feedback for ticket 12345 has already been submitted" }
```

`categories` values: `slow_response`, `issue_unresolved`, `communication`,
`professionalism`, `other` (must match `FEEDBACK_CATEGORIES` in both
`backend/src/types/feedback.types.ts` and
`feedback-website/src/types/feedback.types.ts` — kept as two files
deliberately, since frontend and backend are separately deployable, but
they must be edited together).

## Security measures in place

| Concern | Mitigation |
|---|---|
| SQL injection | Every query goes through `@neondatabase/serverless`'s tagged-template `sql` with interpolated params — never string concatenation |
| XSS via feedback text | `sanitize-html` strips all tags/attributes server-side before insert; React escapes on render either way |
| Spam / scripted abuse | `express-rate-limit` on `POST /api/feedback` (20 req / 15 min / IP by default, tune via env) |
| Duplicate submissions | `UNIQUE (ticket_id)` constraint + explicit 409 handling |
| CORS | Locked to `FRONTEND_ORIGINS` env allowlist, not `*` |
| HTTP headers | `helmet()` sets standard security headers |
| Oversized payloads | `express.json({ limit: "10kb" })` |
| Input validation | Zod schema on the backend is authoritative (frontend Zod is UX-only and can be bypassed) |
| Secrets | `DATABASE_URL` etc. read from env only, never committed (`.env` is gitignored); server fails fast on boot if missing |
| IP logging | `trust proxy` set so `req.ip` reflects the real client behind a reverse proxy, not the proxy itself |

## Local development

```bash
# from repo root — installs backend/ and feedback-website/ independently,
# matching TechCare's --prefix delegation pattern (no npm workspaces)
npm run install:all

# backend
cp backend/.env.example backend/.env   # fill in DATABASE_URL (Neon connection string)
npm run dev:backend                    # http://localhost:5000

# frontend (separate terminal)
cp feedback-website/.env.example feedback-website/.env
npm run dev:frontend                   # http://localhost:5173

# try it locally
open "http://localhost:5173/?ticket=12345&rating=5&subject=Cannot%20login"
```

`npm run build` (root) builds both, delegating via `--prefix`; `npm start`
runs `node backend/dist/server.js`, the deployable API.

## Scope: this is a single page, not a dashboard

This project is intentionally just the one public feedback page — there is
no admin UI, no reporting dashboard, and no `GET` route that lists or
aggregates feedback. The app's only job is: read the URL, show the form,
insert one row.

Viewing/analyzing submitted feedback happens directly in **Neon**, not in
this codebase — use the Neon SQL Editor (or any Postgres client pointed at
`DATABASE_URL`) to query the `feedback` table, e.g.:

```sql
-- recent feedback
SELECT * FROM feedback ORDER BY submitted_at DESC LIMIT 50;

-- average rating by day
SELECT date_trunc('day', submitted_at) AS day, avg(rating), count(*)
FROM feedback GROUP BY 1 ORDER BY 1 DESC;
```

If a reporting UI is wanted later, that would be a new, separately
authenticated set of read-only routes — deliberately out of scope here so
the public-facing surface stays as small as possible.

## Known limitations / next steps

- No email/webhook verification on the incoming link — anyone who has (or
  guesses) a valid `ticket`+`rating` pair can submit once. This matches the
  "no login" nature of an emoji-in-email flow; if stronger authenticity is
  needed later, consider a signed token param (e.g. HMAC of `ticket_id` +
  `rating`) validated server-side before insert.
- `subject` is trusted from the URL as display text only; it is never
  persisted or used in a query, so it carries no injection risk as
  currently used.
