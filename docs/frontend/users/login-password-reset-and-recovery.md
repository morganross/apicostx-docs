# Login, Password Reset, And Recovery

## Login Flow

WordPress is the login system.

The browser hashes the password with SHA-256 before the form is sent. WordPress never receives the password itself and refuses a login that was not hashed. JavaScript must be on.

After WordPress authenticates the user, the plugin derives an unlock key from the hashed password and calls `POST /api/auth/login`.

The backend:

1. validates the plugin secret
2. uses the unlock key to open the stored, wrapped copy of the user's data key
3. holds the data key in RAM
4. confirms the user's encrypted data opens
5. returns a signed 1-hour session token

That session token is what the frontend app uses for API requests.

## Session Refresh

When the WordPress transient expires, the plugin calls `POST /api/auth/refresh`.

Refresh only works if the backend still has the user's data key in RAM. After a backend restart, a logout, or a long idle period, users need to log into WordPress again.

## Recovery Code

The backend issues a recovery code when the user signs up, and a new one after every password change, recovery or account reset. A new code replaces the old one.

The code is shown once by WordPress and should be saved outside the app. It is the only way to keep saved data after a forgotten password.

## Changing The Password While Logged In

The profile page asks for the current password and the new one. The plugin calls `POST /api/auth/rekey` with the unlock keys for both.

Saved data is kept. Every open session is signed out, and a new recovery code is shown.

## Forgotten Password

The reset link in the email opens a form with the new password and a choice:

- **Enter the recovery code.** The plugin calls `POST /api/auth/recover`. Saved data is kept and a new recovery code is shown. A wrong code is reported and the old password still works.
- **Tick "Erase my saved data and start fresh".** The plugin calls `POST /api/auth/reset-account`. Saved data is deleted and cannot be brought back. The credit balance and membership are kept.

One of the two is required.

## What Does Not Work

- Resetting the password from WordPress's own `wp-login.php` form is refused. Use the link in the reset email.
- A site admin cannot set a new password for a user from wp-admin if that user has ACM data.
