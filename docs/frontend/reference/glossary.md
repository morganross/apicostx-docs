# Glossary

## UUID

The stable backend identity for a user.

## Plugin Secret

A shared secret used by the WordPress plugin for privileged server-to-server backend calls.

## DB Key

The 32-byte random data key made at signup. It encrypts the user's protected data and is held in backend RAM while the user is active.

## Unlock Key

The 32-byte key WordPress derives from the browser-hashed password. It opens the stored, wrapped copy of the DB key. It is sent as `db_key_hex`.

## Recovery Code

A user-facing secret that opens the recovery copy of the DB key, so saved data survives a forgotten password. A new one is issued after every password change, recovery or account reset.

## Session Token

The signed 1-hour token used by the frontend app for normal API requests.

## Free DB / Paid DB

The active per-user encrypted DB file whose filename prefix reflects current membership.

## Run Root

The filesystem directory for a run: `data/user_{uuid}/runs/{run_id}/`.

## Results Reader

The read facade that reconstructs run results from normalized tables for API responses, reports, and exports.

