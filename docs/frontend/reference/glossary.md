# Glossary

## UUID

The stable backend identity for a user.

## Plugin Secret

A shared secret used by the WordPress plugin for privileged server-to-server backend calls.

## DB Key

The 32-byte SQLCipher key derived from password material and cached in backend RAM.

## Recovery Code

A user-facing secret that unwraps the stored recovery file and can recover access to encrypted data.

## Session Token

The signed 1-hour token used by the frontend app for normal API requests.

## Free DB / Paid DB

The active per-user encrypted DB file whose filename prefix reflects current membership.

## Run Root

The filesystem directory for a run: `data/user_{uuid}/runs/{run_id}/`.

## Results Reader

The read facade that reconstructs run results from normalized tables for API responses, reports, and exports.

