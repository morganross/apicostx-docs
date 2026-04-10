# Install And Config

## Service Model

The backend runs as a `systemd` service:

- unit file: `/etc/systemd/system/acm2.service`
- working directory: `/opt/acm2/acm2`
- app entry: `uvicorn app.main:app`

## Python Environment

The service uses the backend venv at:

`/opt/acm2/acm2/.venv/`

## Environment Files

The live service loads two env files:

- `/opt/acm2/acm2/.env`
- `/opt/acm2/secrets/acm2-metering.env`

Do not store new secrets in docs.

## Required Config

At minimum, the backend depends on:

- `ENCRYPTION_KEY`
- `SEED_PRESET_ID`
- `SEED_VERSION`
- `ACM2_PLUGIN_SECRET`
- `ACM2_LOG_LEVEL`

Optional but important config includes:

- provider API keys for system-key mode
- `ADMIN_USER_UUID`
- `ACM2_CORS_ORIGINS`

## Certificates

The live service binds to HTTPS on port 443 using:

- `/opt/acm2/secrets/cloudflare.key`
- `/opt/acm2/secrets/cloudflare.crt`

