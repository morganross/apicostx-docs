# Troubleshooting

## “I have a token but requests still return 401”

The token may still be structurally valid, but the backend may have lost the user's DB key from RAM after restart.

Have the user log into WordPress again so the plugin can call `/api/auth/login` and warm the backend key cache again.

## “Refresh stopped working”

`/api/auth/refresh` only works when the backend already has the user's DB key cached.

If refresh returns `401`, the user needs a fresh WordPress login.

## “I can read data but cannot save”

That usually means the user is free-tier.

The backend allows reads for free users but blocks write routes with `403 Paid membership required`.

## “Run not found”

The run ID is not present in the current user's DB.

Check for a stale URL, wrong account, or wrong session token.

## “Report generation failed”

Check the backend logs and then check the run's artifact directory.

Report generation depends on normalized run-result data and the run's stored config being internally consistent.

## “Password changed and now access is broken”

If the backend no longer had the old DB key in RAM, automatic rekey may have failed with `409`.

That is when recovery-code flow matters.

