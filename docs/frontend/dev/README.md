# Backend Docs For Developers

These docs explain how the backend works and how to change it safely.

Start here:

- `architecture-overview.md`
- `component-map.md`
- `request-and-auth-flow.md`
- `storage-and-db-model.md`
- `run-lifecycle.md`
- `testing-and-verification.md`
- `invariants-and-rules.md`

## Ground Rules

This backend is not a generic REST app.

It depends on per-user SQLCipher DBs, RAM-cached DB keys, a WordPress plugin bridge, and filesystem-backed artifacts.
