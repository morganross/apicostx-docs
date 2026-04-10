# User Lifecycle And Membership

## Provisioning

WordPress is responsible for creating the UUID and calling `POST /api/users`.

The backend provisions the encrypted DB, seeds user data, and writes the recovery file.

## Login

WordPress calls `POST /api/auth/login`.

The backend caches the DB key in RAM and issues a session token used by the frontend app.

## Membership Change

WordPress calls:

- `POST /api/users/{uuid}/activate`
- `POST /api/users/{uuid}/deactivate`

The backend renames the active DB file and evicts stale auth/session engine state so the new membership is visible immediately.

## Delete User

WordPress now calls:

`DELETE /api/users/{uuid}`

The backend deletes DB files, sidecars, recovery file, user run directory, shared log exports, and registry/cache state for that UUID.

## Support Rule

One UUID must have one active membership DB file.

If both `free_{uuid}.db` and `paid_{uuid}.db` ever exist at the same time, treat it as a correctness incident.

