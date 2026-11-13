# ACM2 Authentication & Security Report

**Updated:** November 12, 2026
**Scope:** Password handling, the per-user data key, session tokens, password change, reset and recovery

---

## 1. System Overview

Each user's protected data is stored in MariaDB as ciphertext. It is encrypted with a **data key**: 32 random bytes made when the user signs up.

The backend never stores the data key in the clear. It stores wrapped copies of it, and each copy can only be opened with a secret the user holds:

| Wrapped copy | Opened by |
|--------------|-----------|
| Password copy | The unlock key derived from the user's password |
| Recovery copy | The recovery code shown to the user once |
| API key copy (one per API key) | That API key's secret |

The opened data key lives in backend RAM only while the user is active. A copy of the server's disk holds ciphertext and wrapped keys, and nothing that opens them.

---

## 2. From Password To Data

```
User types a password into a WordPress form
    │
    ├─ Browser (assets/js/login-hash.js):
    │       hash = SHA-256(password), sent as 64 lowercase hex characters
    │       The server never receives the password itself.
    │
    ├─ WordPress (class-user-sync.php):
    │       Refuses any value that is not 64 lowercase hex characters.
    │       unlock_key = PBKDF2-SHA256(hash, user_uuid, 600,000 rounds, 32 bytes)
    │
    ├─ WordPress → Backend:  POST /api/auth/login
    │       Body:    { uuid, db_key_hex: <unlock key> }
    │       Header:  X-ACM2-Plugin-Secret
    │
    └─ Backend (auth_key.py::login):
            1. Checks the plugin secret
            2. Reads data/wrapped_decode_keys/user_<uuid>.json
            3. Opens the password copy with the unlock key
               (PBKDF2-SHA256, 600,000 rounds, then AES-256-GCM)
               — wrong password: the copy does not open → 401
            4. Holds the data key in RAM
            5. Reads the user's row in MariaDB to confirm the key works
            6. Returns a session token
```

Every form that takes a password is hashed the same way: login, signup, password reset and password change. There is no server-side hashing of a plain password anywhere. A browser with JavaScript turned off cannot log in or sign up.

### How the data key is used

Each time a database connection is taken for a user, the backend sets the data key as a MariaDB session variable. Protected columns are written with `AES_ENCRYPT` and read with `AES_DECRYPT` using that variable. Each value is prefixed with 16 random bytes before it is encrypted.

Background workers get the data key through a separate, memory-only key store that refuses to start if persistence or replication is turned on.

---

## 3. Session Tokens

```
token = base64url({ uuid, exp, generation }) + "." + HMAC-SHA256(payload, ACM2_SESSION_SIGNING_SECRET)
```

- A token lasts **one hour** by default (`ACM2_SESSION_TTL_SECONDS`).
- The token is signed with its own secret, not the plugin secret.
- `generation` is a per-user value. Changing it revokes every token issued before. Logout, password change and recovery all change it.
- The token does not carry the data key. A valid token is only useful while the data key is in backend RAM.

WordPress keeps the token in a transient for the same lifetime and puts it in the page as `window.acm2Config.sessionToken`.

### On every API request

1. The signature, expiry and generation are checked.
2. The data key must be in RAM. If it is not, the request gets 401 and the user logs into WordPress again.
3. The user's membership is read from their database.
4. The result is cached for five minutes.

### Refresh

When the WordPress transient has expired, WordPress calls `POST /api/auth/refresh` with the plugin secret and the UUID. The backend issues a new token only if the data key is still in RAM.

### When the data key leaves RAM

- The user logs out. If a run is active, the key is kept until that run finishes.
- The user's browser tabs go idle.
- The key has not been used for the idle limit (`ACM2_DB_KEY_CACHE_IDLE_TTL_SECONDS`).
- The backend restarts.

---

## 4. Password Change, Reset And Recovery

The data key never changes when the password changes. Only the password copy is replaced, so no stored data is re-encrypted.

In all three cases the backend is called **before** WordPress changes the password. If the backend refuses or cannot be reached, the old password keeps working.

### Logged-in password change

The user gives the current and the new password. WordPress derives both unlock keys and calls `POST /api/auth/rekey`.

1. The backend opens the password copy with the old unlock key. If it does not open: 401.
2. It stores a new password copy under the new unlock key.
3. It issues a new recovery code. The old code stops working.
4. It revokes every session.

### Forgotten password, with the recovery code

The reset form asks for the new password and the recovery code. WordPress calls `POST /api/auth/recover`.

1. The backend opens the recovery copy with the code. If it does not open: 401, and the failure counts toward the caller's rate limit.
2. It stores a new password copy under the new unlock key.
3. It issues a new recovery code. The used code stops working.
4. It revokes every session and drops the data key from RAM.

### Forgotten password, without the recovery code

The user ticks "Erase my saved data and start fresh". WordPress calls `POST /api/auth/reset-account`.

The old data key cannot be recovered, so the encrypted data is deleted. The account is made again under the new password with a new data key and a new recovery code. **The credit balance and membership are kept.**

### Routes that are closed

- WordPress's own reset form (`wp-login.php`) is refused.
- A password typed into a wp-admin profile screen is refused for an account that has ACM data.

Neither can replace the password copy, so allowing them would leave the account unable to open its data. A password set outside the forms (WP-CLI, a database edit) cannot log in until it is reset by email.

---

## 5. What Each Secret Does

| Secret | Lives where | Purpose |
|--------|-------------|---------|
| User's password | Nowhere. Hashed in the browser. | Source of the unlock key |
| Unlock key | Sent from WordPress to the backend at login, change and reset. Not stored. | Opens the password copy of the data key |
| Data key | Backend RAM while the user is active | Encrypts and decrypts the user's protected columns |
| Recovery code | Shown once to the user | Opens the recovery copy of the data key |
| API key secret | Held by the user | Opens that API key's copy of the data key |
| `ACM2_PLUGIN_SECRET` | WordPress config and backend environment | Proves a call comes from the WordPress server |
| `ACM2_SESSION_SIGNING_SECRET` | Backend environment | Signs session tokens |

---

## 6. Abuse Limits

Failed plugin-secret checks and wrong recovery codes are counted per caller IP. Too many failures inside the window (`ACM2_AUTH_FAILURE_WINDOW_SECONDS`) block that IP for a period (`ACM2_AUTH_FAILURE_BLOCK_SECONDS`).

---

## 7. Notes Carried Over From The April Report

These points from the earlier report still describe the running system.

- **The plugin secret covers many actions.** It authorises login, refresh, password change, recovery, account reset, user creation, membership changes and credit additions.
- **Refresh needs no proof of the password.** `POST /api/auth/refresh` needs the plugin secret, the UUID, and the data key already in RAM.
- **Refresh blocks the page.** On a transient miss, WordPress calls the backend before it sends the page.
- **Session tokens sit in the WordPress database** as transients, readable by anyone with access to that database.

---

## 8. Source Files

| File | Role |
|------|------|
| `acm-wordpress-plugin/assets/js/login-hash.js` | Hashes every password form in the browser |
| `acm-wordpress-plugin/includes/class-user-sync.php` | Derives the unlock key; login, signup, change and reset handlers |
| `acm2/app/api/routes/auth_key.py` | Login, refresh, rekey, recover, reset-account, logout; session tokens |
| `acm2/app/services/db_key_wrapping.py` | Reads and writes the wrapped copies |
| `acm2/app/security/db_crypto.py` | RAM cache of data keys; wrap and unwrap |
| `acm2/app/services/account_lifecycle.py` | Signup, account reset, delete |
| `acm2/app/services/api_keys.py` | API key records and their wrapped copies |
| `acm2/app/auth/session_revocation.py` | Per-user session generation |
| `acm2/app/infra/db/encrypted_types.py` | Column encryption in MariaDB |
