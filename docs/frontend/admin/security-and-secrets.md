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

The DB key is derived from password material on the WordPress side and cached in backend RAM, not stored in plaintext on disk.

## Recovery Files

The backend stores wrapped DB keys in `user_{uuid}.recovery`.

These files are sensitive and should be treated as recovery secrets, not ordinary app data.

