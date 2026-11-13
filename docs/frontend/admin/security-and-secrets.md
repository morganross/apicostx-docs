# Security And Secrets

## Trust Boundaries

There are three important boundaries:

- browser/user
- WordPress plugin
- backend API

The browser should not talk to privileged backend endpoints directly. WordPress uses the plugin secret for server-to-server calls.

## High-Value Secrets

The backend depends on:

- `ACM2_PLUGIN_SECRET`
- `ENCRYPTION_KEY`
- provider API keys
- TLS private key material

These must not be logged, committed, or copied into docs.

## Encryption Model

Per-user DBs are encrypted with SQLCipher.

Each user's data key is random and is made at signup. It is held in backend RAM while the user is active and is never stored in plaintext on disk.

The browser hashes every password with SHA-256 before it is sent. WordPress derives an unlock key from that hash and refuses any password that was not hashed.

## Wrapped Key Files

The backend stores wrapped copies of each user's data key in `data/wrapped_decode_keys/user_{uuid}.json`: one opened by the password unlock key and one opened by the recovery code.

These files are sensitive and should be treated as recovery secrets, not ordinary app data.

