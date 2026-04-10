# ACM2 Authentication & Security Report

**Date:** April 8, 2026  
**Scope:** Backend authentication flow, session token design, key management, multi-process readiness

---

## 1. System Overview

ACM2 uses a **per-user encrypted SQLite database** (SQLCipher) architecture. Each user's data is encrypted at rest with a 32-byte key that is mathematically derived from their WordPress password. The backend never stores the plaintext password or the raw DB key on disk — only in RAM, temporarily, per session.

This is an unusually strong privacy design: a compromised server disk reveals nothing without the user's password. The tradeoff is architectural complexity in the authentication flow.

---

## 2. Full Authentication Sequence

### Step 1 — WordPress Login (once per session)

```
User types password into WordPress login form
    │
    ├─ Browser JS: sha256(password) → "a1b2c3..."  (sent in $_POST['pwd'])
    │
    ├─ PHP (class-user-sync.php::on_wp_login):
    │       db_key = PBKDF2-SHA256(sha256(password), user_uuid, 600,000 iterations, 32 bytes)
    │       — deterministic: same password + same UUID = same 32-byte key, always
    │       — 600k iterations makes brute-force expensive
    │
    ├─ PHP → Backend:  POST /api/auth/login
    │       Body:    { uuid: "abc123...", db_key_hex: "a1b2c3..." }
    │       Header:  X-ACM2-Plugin-Secret: <shared server secret>
    │
    └─ Backend (auth_key.py::login):
            1. Validates plugin_secret header
            2. Parses db_key_hex → 32 raw bytes
            3. Stores in RAM:  _key_cache["abc123"] = <32 bytes>
            4. Attempts to open the user's SQLCipher .db file with this key
               — if the DB opens: key is correct (SQLCipher format IS the hash check)
               — if the DB fails to open: wrong key → evict from cache → 401
            5. Issues session token:
               payload = { uuid: "abc123", exp: now+3600, v: 1 }
               token   = base64(payload) + "." + HMAC-SHA256(payload, plugin_secret)
            6. Returns { session_token: "..." }
            7. PHP stores token in WordPress DB transient (55 min TTL)
               PHP injects into page HTML: window.acm2Config = { sessionToken: "..." }
```

The browser receives the token via the page. It never sees the plugin_secret or the db_key.

---

### Step 2 — Every API Request (GET /runs, POST /run/start, etc.)

```
Browser → Backend:
    Header: X-ACM2-Session-Token: <token>

Backend middleware (auth/middleware.py::get_current_user):
    A. Check _auth_cache[token] → if hit, return cached user dict (fast path, 5 min TTL)
    B. verify_session_token(token, plugin_secret):
          — split token into payload_b64 + signature
          — recompute HMAC, compare with constant-time compare_digest()
          — decode payload, check v==1, check exp > now
          — return uuid = "abc123"
    C. get_cached_db_key("abc123")
          — if None → 401 "server restarted, please re-login to WordPress"
          — if present → continue
    D. _get_or_create_user_engine("abc123")
          — opens or reuses the SQLCipher connection using _key_cache key
          — SELECT uuid FROM user_meta → confirms DB is open and readable
    E. returns user = { uuid, membership }
    F. _auth_cache[token] = user  (cached for 5 min to avoid repeating C-D)
```

---

### Step 3 — Token Refresh (on page load when transient has expired)

```
PHP (class-frontend-app.php::get_session_token):
    — WordPress transient acm2_sess_{user_id} has expired (>55 min since last load)
    — PHP → Backend:  POST /api/auth/refresh
          Body:    { uuid: "abc123" }
          Header:  X-ACM2-Plugin-Secret: <shared server secret>

Backend (auth_key.py::refresh):
    1. Validates plugin_secret header
    2. Checks _key_cache["abc123"] — if None → 401 (user must re-login to WP)
    3. If key is cached → issues new session token (no DB open, no password needed)
    4. Returns { session_token: "...", expires_in: 3600 }

Note: this call blocks PHP before HTML is sent to the browser (10s timeout).
```

---

## 3. What Each Credential Does

| Credential | Lives Where | Used By | Purpose |
|-----------|-------------|---------|---------|
| `plugin_secret` | WordPress config + backend `.env` | PHP server → backend | Gate: proves call comes from our WP server, not the internet |
| `db_key` (32 bytes) | Backend RAM only (`_key_cache`) | Backend DB layer | Decrypts each user's SQLCipher database |
| `session_token` | WP DB transient + browser memory | Browser → backend | Identifies and authenticates the user on every API call |
| User's password | Never stored anywhere | Only at login moment | Source material for deriving db_key |

---

## 4. What the Session Token Is and Isn't

The token is **not a JWT** but follows the same pattern: a signed payload.

```
token = base64url({ uuid, exp, v }) + "." + HMAC-SHA256(base64url_payload, plugin_secret)
```

**The token proves:** "The holder of this token is user `uuid`, and a trusted server (WP) gave it to them before `exp`."

**The token does NOT carry:** the db_key. The db_key must already be in `_key_cache` RAM on the backend for the token to be useful. This is the architectural constraint that prevents the backend from running multiple worker processes.

---

## 5. Security Analysis

### 5.1 Strengths

**Password never stored.** The raw password is used for one PBKDF2 computation then discarded. Not stored on disk anywhere.

**DB key never on disk.** `_key_cache` is a Python dict in RAM only. A disk image of the server reveals no keys.

**SQLCipher opens = the hash check.** The backend doesn't need to store a bcrypt hash to verify the password. The DB file itself is the verifier — if PBKDF2(password, uuid) produces the wrong key, SQLCipher silently decrypts garbage and the `SELECT 1` fails. This is equivalent to a stored hash but with an additional layer (the 32-byte key also opens the encrypted data).

**HMAC token forgery resistance.** Tokens are verified with `hmac.compare_digest()` (constant-time) — immune to timing attacks. Forging a token requires knowing `plugin_secret`.

**Key never logged.** All log lines reference only the last 8 chars of UUID. `db_key_hex` never appears in any log statement.

**HTTPS everywhere.** The db_key transits in a POST body but only over TLS. Cloudflare sits in front.

---

### 5.2 Weaknesses

#### W1 — `plugin_secret` is a single key with too much power (Medium)

`plugin_secret` authorises all of the following:

| Endpoint | Effect |
|----------|--------|
| `POST /api/auth/login` | Deliver DB key, get token for any user |
| `POST /api/auth/refresh` | Get a token for any user whose key is in RAM |
| `POST /api/auth/rekey` | Re-encrypt any user's database |
| `POST /api/users` | Create user accounts |
| `POST /api/users/{uuid}/activate` | Upgrade any user to paid |
| `POST /api/users/{uuid}/deactivate` | Downgrade any user |
| `POST /api/credits/add` | Add credits to any account |

A single leaked secret grants full control over every user and every account operation. There is no scope separation.

**Blast radius of a leaked `plugin_secret`:**
- Attacker can call `/auth/refresh` for any UUID whose key is currently in `_key_cache`
- Attacker gets a valid session token → can read/write that user's entire dataset
- Attacker can add credits to accounts or downgrade paid users
- Attacker cannot access users whose key is NOT in cache (backend restart clears all keys)

**Recommended fix:** Split into two secrets:
- `PLUGIN_ADMIN_SECRET` — user provisioning and membership management only
- `PLUGIN_SESSION_SECRET` — auth/login, auth/refresh, auth/rekey only

Leaking the admin key can't impersonate users. Leaking the session key can't create accounts or modify memberships.

---

#### W2 — `/auth/refresh` requires no password proof (Low-Medium)

`/auth/refresh` issues a session token using only `plugin_secret + uuid`. It implicitly relies on `_key_cache` as a second factor (if the key isn't in RAM, it returns 401). But the key being in RAM just means "this user logged in since the last server restart" — not that the calling process is authorised on behalf of that specific user.

If `plugin_secret` leaks, an attacker can enumerate UUIDs (they're stored in WordPress user meta — a separate concern) and call `/auth/refresh` for any user currently active. 

**Mitigating factor:** attack window is only while keys are in RAM (cleared on restart) and attacker must know specific UUIDs.

**Recommended fix:** `/auth/refresh` should require either:
- The current (still-valid) session token as proof of prior auth, **or**
- The `db_key_hex` again (re-prove you know the password)

Currently it requires neither.

---

#### W3 — No rate limiting on auth endpoints (Medium)

`POST /api/auth/login`, `/auth/refresh`, `/auth/rekey` have no per-IP or per-UUID rate limiting at the application layer. Cloudflare provides some DDoS protection but not application-layer throttling.

**Consequences without `plugin_secret` leaking:** Limited — the endpoint requires the secret, so random internet traffic is rejected immediately.

**Consequences with `plugin_secret` leaked:** An attacker could call `/auth/refresh` in a tight loop for every known UUID with no throttling.

**Recommended fix:** Cloudflare WAF rule — rate limit `POST /api/auth/*` to 10 requests/minute per IP. Zero code changes required. Free tier supports it.

---

#### W4 — `_key_cache` prevents horizontal scaling (Architectural)

The DB encryption key is stored only in one process's RAM. Multiple `uvicorn --workers N` processes each have their own copy of `_key_cache`. A user whose login was handled by worker #1 gets a `RuntimeError: No encryption key cached` on any request routed to worker #2.

**Current mitigating factor:** uvicorn already runs with `--loop auto`, which selects uvloop (already installed). Single-process async handles significant concurrent load.

**To enable multi-process:** Embed an AES-wrapped copy of the db_key inside the session token payload. Every worker decrypts it from the token on each request. `_key_cache` becomes a performance cache only (no longer required for correctness). This requires a one-time token version bump (v1 → v2) and changes to `create_session_token`, `verify_session_token`, and `get_current_user` middleware.

---

#### W5 — PHP blocking auth call on page load (Low, situational)

`class-frontend-app.php` calls `POST /api/auth/refresh` synchronously before sending any HTML to the browser (10-second timeout). In normal operation the WordPress transient is warm (55-min TTL) and this call is skipped entirely. On transient miss, if the backend is degraded, users see a blank screen for up to 10 seconds.

**Practical frequency:** Once per user per ~55 minutes of active usage. Not per page navigation.

---

#### W6 — Session tokens stored unencrypted in WordPress DB (Low)

`set_transient('acm2_sess_{user_id}', $token, 55*MINUTE)` stores the session token in the WordPress MySQL database in plaintext. A MySQL breach means an attacker gets valid tokens for all active users without needing `plugin_secret`.

**Mitigating factor:** MySQL access = full WordPress site compromise anyway. This doesn't add meaningfully to the blast radius of a MySQL breach.

---

## 6. Threat Model Summary

| Attack | Requires | Impact | Likelihood |
|--------|----------|--------|------------|
| Forge session token | `plugin_secret` | Full user impersonation | Low (server-side secret) |
| Get token for active user | `plugin_secret` + known UUID + key in cache | Read/write user data | Low |
| Create fake accounts | `plugin_secret` | Account spam | Low |
| Add credits to account | `plugin_secret` | Financial loss | Low |
| Brute-force DB key | UUID + PBKDF2 cracking (600k iterations) | Full data access | Very Low |
| Disk theft of server | Physical access | Nothing (keys not on disk) | Very Low |
| Read data from DB file directly | SQLCipher key | Full data access | Very Low (key never on disk) |
| MySQL breach | MySQL credentials | Active session tokens only | Low-Medium |

---

## 7. Recommended Changes (Priority Order)

### P1 — Cloudflare WAF rate limit on `/api/auth/*` (easy, no code)

Add a Cloudflare WAF custom rule:
- Match: `http.request.uri.path contains "/api/auth/"` AND `http.request.method eq "POST"`
- Action: Rate limit — 10 requests per minute per IP
- This closes W3 with zero backend changes.

### P2 — Split `plugin_secret` into two secrets (medium, backend + PHP)

Create `PLUGIN_ADMIN_SECRET` and `PLUGIN_SESSION_SECRET` in `.env` and WordPress config. Admin endpoints use admin secret; auth endpoints use session secret. Limits blast radius of either leaking. Token HMAC signing moves to session secret.

### P3 — Strengthen `/auth/refresh` to require the current token (medium, backend only)

Change `POST /api/auth/refresh` body from `{ uuid }` to `{ uuid, current_token }`. Verify `current_token` is a valid, non-expired session token before issuing a new one. Now `/auth/refresh` can't be called without proof of prior legitimate auth. `plugin_secret` alone is no longer sufficient for impersonation.

### P4 — Embed wrapped db_key in session token (larger refactor, enables multi-process)

Token v2 payload:
```json
{ "uuid": "...", "exp": 1234567890, "v": 2, "k": "<AES256-GCM(db_key, TOKEN_WRAP_KEY)>" }
```
Where `TOKEN_WRAP_KEY` is a separate secret in `.env`. `get_current_user` middleware decrypts `k` on every request and calls `cache_db_key()` from the token — no login required for the key to be available. `_key_cache` becomes optional (performance only). Backend can then run `--workers N` safely.

---

## 8. What Is NOT a Vulnerability

- **The PBKDF2 key derivation:** 600,000 iterations with user UUID as salt is solid. Standard, well-reviewed algorithm.
- **The HMAC token signature:** constant-time comparison, SHA-256, standard pattern.
- **db_key transit:** POST body over HTTPS with Cloudflare TLS termination.
- **db_key in logs:** confirmed absent from all log statements.
- **SQLCipher as the hash check:** using the DB open itself as key verification is clean and avoids storing a separate hash.
