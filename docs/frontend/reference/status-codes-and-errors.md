# Status Codes And Errors

## `200` / `201` / `204`

Normal success responses.

`201` is used for resource creation. `204` is used for delete-without-body responses.

## `400`

Bad request shape or invalid user input.

Examples: malformed key hex, duplicate names, missing required preset/run data.

## `401`

Authentication or trust-boundary failure.

Examples: missing session token, invalid plugin secret, refresh after backend restart with no cached DB key.

## `403`

Authenticated but forbidden.

Examples: free-tier write blocked, non-admin access to admin routes.

## `404`

Resource not found.

Examples: run not found, preset not found, provider key not found.

## `409`

Conflict with current encrypted-state assumptions.

Primary example: password rekey requires the old DB key, but that key is no longer cached.

## `425`

User setup is still in progress.

This is returned by the per-user DB dependency when seeding has not reached `ready` yet.

## `500`

Unexpected server failure.

Check backend logs and the relevant artifact directory when this happens.

