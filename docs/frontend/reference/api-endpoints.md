# API Endpoints Reference

This is a human navigation map, not a full generated OpenAPI dump.

All routes are under `/api`.

## Health

- `GET /health`
- `GET /health/safe-to-restart`

## Auth

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/rekey`

## Users

- `POST /users`
- `GET /users/me`
- `POST /users/{uuid}/activate`
- `POST /users/{uuid}/deactivate`
- `DELETE /users/{uuid}`

## Presets

- `POST /presets`
- `GET /presets`
- `GET /presets/{id}`
- `PUT /presets/{id}`
- `DELETE /presets/{id}`
- `POST /presets/{id}/duplicate`
- `POST /presets/{id}/execute`

## Contents

- `GET /contents`
- `GET /contents/counts`
- `POST /contents`
- `GET /contents/{id}`
- `PUT /contents/{id}`
- `DELETE /contents/{id}`
- `POST /contents/{id}/resolve`
- `POST /contents/{id}/duplicate`

## Runs

- `POST /runs`
- `GET /runs`
- `GET /runs/count`
- `GET /runs/{id}`
- `DELETE /runs/{id}`
- `DELETE /runs/bulk`

## Run Control

- `POST /runs/{id}/start`
- `POST /runs/{id}/pause`
- `POST /runs/{id}/resume`
- `POST /runs/{id}/cancel`
- `GET /runs/{id}/checkpoint`
- `POST /runs/{id}/tasks/{task_key}/skip`
- `POST /runs/{id}/reevaluate`

## Run Artifacts

- `GET /runs/{id}/report`
- `GET /runs/{id}/logs`
- `GET /runs/{id}/logs/count`
- `GET /runs/{id}/generated/{doc_id}`
- `POST /runs/{id}/export`
- `GET /runs/{id}/export`
- `POST /runs/{id}/share-logs`

## Credits

- `GET /credits`
- `POST /credits/add`

## Provider Keys

- `POST /provider-keys`
- `GET /provider-keys`
- `GET /provider-keys/{provider}`
- `DELETE /provider-keys/{provider}`
- `GET /provider-keys/test/{provider}`

## Settings

- `GET /settings`
- `PUT /settings`

## Admin

- `GET /admin/system-keys`
- `GET /admin/system-keys/{provider}`
- `POST /admin/system-keys`
- `DELETE /admin/system-keys/{provider}`

## Secondary Route Groups

There are also route groups for documents, generation, evaluation, rate limits, GitHub connections, models, and metering.

Those should be documented in more detail if they become active frontend or admin surfaces.

