# Testing And Verification

## Minimum Regression Set

Before deploying backend auth or lifecycle changes, verify:

1. signup / provisioning
2. WordPress login
3. frontend app load
4. session refresh
5. free to paid membership change
6. paid to free membership change
7. password change
8. password reset
9. run create / start / report / export
10. delete user

## Cold-Start Checks

After backend restart, verify:

- `/api/health`
- user registry load count
- WordPress login restores DB-key cache
- frontend app can recover by re-login when refresh fails

## Performance Checks

For performance work, measure at least:

- `/api/runs`
- `/api/runs/{id}`
- `/api/runs/{id}/report`
- `/api/runs/{id}/export`
- process RSS during heavy run/export flows

