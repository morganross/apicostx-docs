# Login, Password Reset, And Recovery

## Login Flow

WordPress is the login system.

After WordPress authenticates the user, the plugin derives the user's DB key from the password hash material and calls `POST /api/auth/login`.

The backend:

1. validates the plugin secret
2. caches the user's DB key in RAM
3. verifies the encrypted DB opens
4. returns a signed 1-hour session token

That session token is what the frontend app uses for API requests.

## Session Refresh

When the WordPress transient expires, the plugin calls `POST /api/auth/refresh`.

Refresh only works if the backend still has the user's DB key cached in RAM. After a backend restart, users generally need to log into WordPress again.

## Password Change And Reset

There are two important paths:

- password reset flow
- logged-in password change flow

The plugin now handles both by posting the new DB key to `POST /api/auth/rekey`.

## Recovery Code

The backend generates a recovery code when the user is first provisioned and again after a successful rekey.

The recovery file on disk stores the wrapped DB key. The recovery code is shown once to the user by the WordPress layer and should be saved outside the app.

## Failure Case

If the backend no longer has the old DB key in RAM when a password change happens, rekey returns `409`.

That is a real limitation of the design: the system cannot re-encrypt the DB without the old key.

