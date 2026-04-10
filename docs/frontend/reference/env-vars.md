# Environment Variables Reference

Do not put secret values in docs.

This file documents names and purpose only.

## Main Backend Env File

The main app config comes from `/opt/acm2/acm2/.env`.

Important variables:

- `DEBUG`
- `ACM2_LOG_LEVEL`
- `DATABASE_URL`
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_API_KEY`
- `TAVILY_API_KEY`
- `ENCRYPTION_KEY`
- `ADMIN_USER_UUID`
- `API_KEY`
- `RATE_LIMIT_MAX_REQUESTS`
- `RATE_LIMIT_WINDOW_SECONDS`
- `ACM2_PLUGIN_SECRET`
- `DATA_DIR`
- `DOCUMENTS_DIR`
- `ARTIFACTS_DIR`
- `LOGS_DIR`
- `SEED_PRESET_ID`
- `SEED_VERSION`
- `MAX_CONCURRENT_TASKS`
- `SAFETY_CEILING_SECONDS`
- `ACM2_CORS_ORIGINS`

## Metering Env File

The service also loads `/opt/acm2/secrets/acm2-metering.env`.

Current keys:

- `ACM_ALLOW_SELF_SIGNED`
- `ACM_AUTH_TOKEN`
- `ACM_METERING_AUTH_TOKEN`
- `ACM_METERING_URL`

## systemd Context

The service unit is `/etc/systemd/system/acm2.service`.

It binds the two env files above and starts Uvicorn over HTTPS on port 443.

