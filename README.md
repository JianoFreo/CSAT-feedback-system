# CSAT Feedback System
# Live Site: https://csat-feedback-system.onrender.com 
A public feedback capture flow triggered from Freshdesk emoji-rating emails.
# Rating Template with specified agents
<img width="1502" height="870" alt="image" src="https://github.com/user-attachments/assets/53cf0db7-10ad-4687-9363-34404cb16ef2" />
<img width="627" height="503" alt="image" src="https://github.com/user-attachments/assets/6acbb761-94fa-45ca-926f-6ed63e927d28" />

# Form prefilled Microsoft forms depending on the URL endpoint( 3 ratings - Disappointed, Neutral, Satisfied )
<img width="1117" height="855" alt="image" src="https://github.com/user-attachments/assets/9a46796d-88db-40fc-83ec-c70530c57684" />
<img width="1100" height="848" alt="image" src="https://github.com/user-attachments/assets/6eeafa46-363b-4da3-9ec2-f9204b222265" />

<img width="1101" height="850" alt="image" src="https://github.com/user-attachments/assets/6b9861b6-ecce-4df7-a64a-b1c2b542b501" />




## Stack

PERN: **P**ostgres (Neon serverless) + **E**xpress + **R**eact + **N**ode.

```
rating/ (frontend)  --axios-->  backend/ (Express API)  --sql``-->  Neon Postgres
```

## Local dev

```bash
# from repo root
npm run dev              # -> npm run dev --prefix backend (nodemon + tsx)

# frontend dev server (separate terminal, for HMR)
cd rating && npm run dev
```

`backend/.env` (see `backend/.env.example`):
```
DATABASE_URL=your-neon-connection-string
NODE_ENV=development
PORT=5000
FRONTEND_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=20
```

`rating/.env`:
```ts
VITE_API_BASE_URL=http://localhost:5000
VITE_WEB_FORM_URL=form-site-url
```

`connectNeon()` in `backend/src/config/db.ts` runs `CREATE TABLE IF NOT EXISTS`
on server boot — starting the backend against a fresh Neon database is
sufficient to provision the schema; there's no separate migration/seed step.

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




