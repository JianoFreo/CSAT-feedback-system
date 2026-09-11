## Exposing local backend (Cloudflare Tunnel)

`docker-compose.yml` includes a `cloudflared` service that tunnels the
`backend` container to the internet, e.g. for testing Freshdesk webhooks
against your local machine.

1. In the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com/) →
   **Networks → Tunnels**, create a tunnel and copy its token.
2. Set `TUNNEL_TOKEN=<your-token>` in the root `.env` file (alongside
   `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `FRONTEND_ORIGINS`).
3. In the tunnel's **Public Hostname** settings, point your chosen hostname
   at service `http://backend:5000`.
4. `docker compose up` — the tunnel connects outbound automatically, no
   inbound ports needed.

Don't need a persistent/custom domain? Swap the `cloudflared` command for a
free ephemeral quick tunnel instead (prints a random `trycloudflare.com`
URL to its logs on startup, no Cloudflare account required):

```yaml
  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    depends_on:
      - backend
    command: tunnel --no-autoupdate --url http://backend:5000
```