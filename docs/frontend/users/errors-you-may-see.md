# Errors You May See

## `401 Authentication required`

The frontend sent no valid session token.

Usually this means the user is not logged in, or the frontend could not get a fresh token from WordPress.

## `401 Session expired after server restart`

The session token itself may still be valid, but the backend lost the user's DB key from RAM during restart.

The fix is to log into WordPress again so the plugin can re-cache the key.

## `403 Paid membership required`

The user is on the free tier and attempted a write operation.

Free users can read, but they cannot save user state.

## `404 Run not found`

The requested run does not exist in the current user's DB.

This often means the frontend is looking at a stale run ID or the wrong account.

## `409 Old DB key not cached`

Password rekey was attempted, but the backend no longer had the old encryption key in RAM.

This means normal automatic rekey cannot proceed and recovery-code flow is required.

## `500 Failed to generate report`

The backend failed while reconstructing the report from normalized result data or run config.

Support/admin should check backend logs and the run's artifact directory.

