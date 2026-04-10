# API Help And Knowledge Base

This section is for people who need to use the ACM2 API, not read the code.

It explains how the API actually behaves in practice, what credentials it expects, and how common workflows fit together.

## Start Here

- `getting-started.md`
- `authentication.md`
- `common-workflows.md`
- `troubleshooting.md`

## What Kind Of API This Is

ACM2 is not a generic public API with one static bearer token.

It is a user-scoped API built around:

- WordPress login
- backend session tokens
- per-user encrypted databases
- plugin-secret server-to-server calls for privileged actions

That means there are really two ways to call it:

1. as the frontend app or a logged-in user, using `X-ACM2-Session-Token`
2. as the trusted WordPress/plugin side, using `X-ACM2-Plugin-Secret`

## What To Read Next

If you are trying to call the API from a script or CLI, start with `authentication.md`.

If you are trying to understand how presets, contents, runs, reports, and exports fit together, read `common-workflows.md`.

