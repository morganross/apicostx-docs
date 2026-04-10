# Logs, Debugging, And Incidents

## Log Locations

Main backend logs live under:

`/opt/acm2/acm2/logs/`

Important files include:

- rotating `acm2_main_*.log`
- `auth-failures.log`

## Journal Logs

For service-level debugging, use:

`journalctl -u acm2.service`

This is the fastest way to inspect startup failures and crash loops.

## Common Incident Patterns

- session token valid but DB key not in cache
- plugin secret invalid or missing
- report generation failure for a specific run
- duplicate free/paid DB state for one UUID
- password rekey failed because old key was not cached

## First Debug Checks

1. check `systemctl status acm2.service`
2. check `/api/health`
3. check recent `journalctl` lines
4. check whether the user's UUID resolves to the expected DB file
5. check whether the backend has the DB key cached again after user login

