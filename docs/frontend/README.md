# Backend Documentation

This is the canonical backend docs entry point.

The backend serves the ACM2 API, owns per-user encrypted databases, stores run artifacts on disk, and integrates with the WordPress plugin for user provisioning, login, membership changes, and password rekey.

## Audiences

- `help/` is the narrative help section and knowledge base for using the API.
- `users/` explains what the backend does from the product user's point of view.
- `admin/` explains how to run, debug, and support the backend in production.
- `dev/` explains how the codebase is structured and how core flows work.
- `reference/` holds stable reference material such as routes, env vars, and current issues.

## Source Of Truth

These docs are based on the live backend code in:

- `acm2/app/`
- `/etc/systemd/system/acm2.service`
- the deployed WordPress plugin bridge used by ACM2

Older plans, postmortems, and one-off reports remain in `/opt/acm2/docs/` and `/opt/acm2/docs/archive/`, but they are historical context, not the primary docs set.

## Fast Start

- API help and usage guides: `help/README.md`
- User-facing account and login behavior: `users/README.md`
- Production operations: `admin/README.md`
- Code architecture and flows: `dev/README.md`
- Route and env reference: `reference/`

