# Services, Health, And Restarts

## Main Service

The main backend service is `acm2.service`.

Useful commands:

- `systemctl status acm2.service`
- `sudo systemctl restart acm2.service`
- `journalctl -u acm2.service -n 200 --no-pager`

## Health Checks

Primary health endpoint:

- `GET /api/health`

Also available:

- `GET /api/health/safe-to-restart`

## Cold-Start Reality

On cold start, the backend can load the user registry, but it cannot open encrypted per-user DBs until user DB keys are cached again through login.

This is why auth refresh and some user actions can fail until the user logs back into WordPress after a restart.

## What A Clean Start Looks Like

Normal startup logs include:

- SQLCipher import success
- user registry load count
- seed DB presence
- orphan recovery skipped for users without cached keys

## Restart Impact

Restart does not destroy on-disk data.

Restart does clear in-RAM DB-key state, in-memory auth cache, and in-memory engine cache.

