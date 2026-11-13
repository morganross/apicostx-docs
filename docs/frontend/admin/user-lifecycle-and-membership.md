# User Lifecycle And Membership

## Provisioning

WordPress is responsible for creating the UUID and calling `POST /api/users`.

The backend makes a random data key, provisions the encrypted DB, seeds user data, and stores the wrapped copies of the data key.

## Login

WordPress calls `POST /api/auth/login`.

The backend opens the data key with the password unlock key, holds it in RAM, and issues a session token used by the frontend app.

## Membership Change

WordPress calls:

- `POST /api/users/{uuid}/activate`
- `POST /api/users/{uuid}/deactivate`

The backend renames the active DB file and evicts stale auth/session engine state so the new membership is visible immediately.

## Delete User

WordPress now calls:

`DELETE /api/users/{uuid}`

The backend deletes DB files, sidecars, wrapped key file, user run directory, shared log exports, and registry/cache state for that UUID.

## Support Rule

One UUID must have one active membership DB file.

If both `free_{uuid}.db` and `paid_{uuid}.db` ever exist at the same time, treat it as a correctness incident.

