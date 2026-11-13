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
- `data/wrapped_decode_keys/user_{uuid}.json`

## Encryption

Per-user DBs are SQLCipher-encrypted.

The data key is random and is made at signup. At login the backend opens its stored, wrapped copy with the unlock key that WordPress derives from the hashed password, and holds the data key in RAM.

## Shared Data

Not everything is per-user encrypted.

The shared credits database and some operator-facing artifacts are separate from the per-user content DBs.

