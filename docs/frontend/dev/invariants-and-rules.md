# Invariants And Rules

## Identity

One user has one stable UUID.

Do not introduce alternate primary identities into backend logic.

## Active DB State

One UUID must have one active membership DB file.

If both `free_{uuid}.db` and `paid_{uuid}.db` exist, that is an incident.

## Auth

Normal frontend auth is session-token based.

Do not reintroduce API-key auth for browser requests.

## Membership

The live product model is binary:

- free
- paid

Free users may read but not write user state.

## Versioning

Do not introduce API versioning into frontend/backend request paths.

Any new version-like route or compatibility layer needs explicit review first.

## Docs

Behavior changes to auth, membership, storage, lifecycle, or operations must be reflected in `docs/backend/`.

Historical reports are not a substitute for current docs.

