# Architecture Overview

## Core Shape

The backend is a FastAPI service with four main layers:

- `api/` for route handlers and schemas
- `auth/` for user registry and request authentication
- `infra/db/` for encrypted per-user DB engines and repositories
- `services/` for run execution, exports, results assembly, and integration logic

Supporting layers:

- `security/` for encryption, provider keys, and DB-key caching
- `evaluation/` for eval logic and report generation
- `adapters/` for model-specific generation backends

## Runtime Model

Each user has:

- one active encrypted DB file
- one per-user log DB
- one filesystem run-artifact tree

The backend does not use a single master app DB for user content.

## Startup

On startup the app:

1. installs the env override proxy
2. registers the SQLCipher dialect
3. verifies `sqlcipher3` import
4. loads the user registry from the filesystem
5. initializes the shared credits DB
6. verifies the seed DB exists
7. attempts orphan-run recovery only for users whose DB key is already cached

