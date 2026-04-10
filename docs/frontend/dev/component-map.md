# Component Map

## `app/main.py`

App startup, middleware, logging, health of the overall FastAPI process.

## `app/api/`

Route handlers and request/response schemas.

Important route groups:

- auth
- users
- presets
- contents
- runs
- credits
- provider keys
- admin

## `app/auth/`

Authentication middleware and the filesystem-backed user registry.

This is where session-token auth and membership DB-path resolution meet.

## `app/infra/db/`

Encrypted per-user DB engine creation, session management, models, repositories, and shared credits DB support.

## `app/security/`

DB-key cache, encryption helpers, provider-key encryption, and request-time key injection.

## `app/services/`

Business logic that does the heavy lifting:

- run execution
- config building
- GitHub input import
- results reading
- export building
- log writing and reading

## `app/evaluation/`

Evaluation logic and report generation.

## `app/adapters/`

Generator implementations and adapter-specific logic for providers and pipelines.

