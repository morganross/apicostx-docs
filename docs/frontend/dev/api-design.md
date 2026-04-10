# API Design

## Design Pattern

The backend mixes three route types:

- user session routes
- plugin-secret server-to-server routes
- admin-only routes

That split matters more than pure resource naming.

## Important Constraints

- no frontend API versioning
- no localStorage-based frontend auth
- free tier is read-only
- normal frontend auth is session-token only

## Route Groups

Main route groups are:

- auth
- users
- presets
- contents
- runs
- provider keys
- credits
- settings
- admin

## Error Style

Routes use normal HTTP status codes with short `detail` messages.

Operationally important codes in this system are `401`, `403`, `404`, `409`, and `425`.

