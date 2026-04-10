# Account And Membership

## Identity Model

Each user has a stable UUID stored in WordPress and used by the backend as the primary identity.

The backend does not use integer WordPress user IDs as its main identity key.

## Membership Model

The live product model is binary:

- free
- paid

The backend stores the current membership state in the active database filename:

- `free_{uuid}.db`
- `paid_{uuid}.db`

## Free Users

Free users may read data, but they may not write user state.

The backend enforces this at request time by blocking write methods for free users except for a small bootstrap/auth allowlist.

## Paid Users

Paid users can create and update presets, content, runs, and related user data.

Paid status is also what unlocks normal write flows from the frontend.

## Provisioning

On signup, the WordPress plugin creates or confirms the user's UUID and calls `POST /api/users`.

The backend creates the user's encrypted database, seeds initial data, caches the DB key in RAM, and writes a recovery file.

## Membership Changes

WordPress calls the backend membership endpoints through the plugin:

- `POST /api/users/{uuid}/activate`
- `POST /api/users/{uuid}/deactivate`

The backend renames the active DB file and updates the in-memory registry.

