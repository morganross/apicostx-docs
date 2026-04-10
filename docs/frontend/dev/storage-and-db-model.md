# Storage And DB Model

## Active Membership DBs

The active user DB naming scheme is:

- `paid_{uuid}.db`
- `free_{uuid}.db`

The membership prefix is part of the current source of truth.

## User Registry

`app/auth/user_registry.py` scans the data directory for those files on startup and builds an in-memory map:

- `uuid -> {path, membership}`

Duplicate free/paid files for one UUID are treated as a correctness problem.

## Per-User Runtime Data

The backend also uses:

- `data/user_{uuid}/runs/{run_id}/...`
- `data/user_{uuid}/logs.db`
- `data/user_{uuid}.recovery`

## Encryption

Per-user DBs are SQLCipher-encrypted.

The DB key is derived from password material on the WordPress side and cached in backend RAM before the DB is opened.

## Shared Data

Not everything is per-user encrypted.

The shared credits database and some operator-facing artifacts are separate from the per-user content DBs.

