# CSAT Feedback System
# Live Site: https://csat-feedback-system.onrender.com 
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


## How the "prefill" flow works

The Freshdesk email template links each emoji to the form site

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


`connectNeon()` in `backend/src/config/db.ts` runs this on every boot; there
is no separate migration step (same pattern as `CREATE TABLE IF NOT
EXISTS` — safe to re-run).

**Design decision:** `ticket_id` is `UNIQUE`. One rating per ticket. A
second submission for the same ticket returns `409 Conflict` with a clear
message instead of silently overwriting or duplicating rows. If your
Freshdesk flow needs to allow re-rating (e.g. ticket reopened), drop the
constraint and instead `UPSERT` (`ON CONFLICT (ticket_id) DO UPDATE`) in
`feedback.repository.ts`.


## Security measures in place

web_forum/form/.env

```ts
VITE_DISAPPOINTED=yourprefilledform
VITE_NEUTRAL=yourprefilledform
VITE_SATISFIED=yourprefilledform
```

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




