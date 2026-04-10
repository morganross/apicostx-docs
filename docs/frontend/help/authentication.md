# Authentication

## The Two Auth Modes

There are two distinct auth paths.

### 1. Normal User/App Auth

Normal user-facing API requests use:

`X-ACM2-Session-Token`

This is the token the WordPress plugin obtains from:

- `POST /api/auth/login`
- `POST /api/auth/refresh`

This is the auth mode used by the frontend app.

### 2. Trusted Plugin Auth

Privileged server-to-server requests use:

`X-ACM2-Plugin-Secret`

This is used for actions like:

- user creation
- login token exchange
- refresh
- password rekey
- membership activate/deactivate
- credit addition
- backend user deletion

This is not for browsers.

## What Is Not Used

Normal browser API-key auth is gone.

Do not build new clients around `X-ACM2-API-Key` for user requests.

## Example: Normal Authenticated Request

```bash
curl -sS \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/runs
```

## Example: Trusted Plugin Request

```bash
curl -sS \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-ACM2-Plugin-Secret: $PLUGIN_SECRET" \
  -d '{"uuid":"USER_UUID","db_key_hex":"..."}' \
  https://api.apicostx.com/api/auth/login
```

## Why Refresh Can Fail After Restart

Refresh needs the backend to still have the user's DB key in RAM.

If the backend restarted and lost that key cache, refresh returns `401` and the user must log into WordPress again.

