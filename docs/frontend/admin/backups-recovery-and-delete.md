# Backups, Recovery, And Delete

## What Lives On Disk

The backend stores user state in three main places:

- per-user encrypted DB files: `paid_{uuid}.db` or `free_{uuid}.db`
- per-user runtime/artifact directories: `data/user_{uuid}/runs/...`
- wrapped key files: `data/wrapped_decode_keys/user_{uuid}.json`

There is also a shared credits DB and shared logs for operator review.

## Wrapped Key Files

`wrapped_decode_keys/user_{uuid}.json` contains the wrapped copies of the user's data key: one opened by the password and one opened by the recovery code.

It is sensitive and should be handled like a recovery secret, not as ordinary content. Without it the user's encrypted data cannot be opened by anyone.

## Delete Behavior

The backend delete endpoint removes:

- active free/paid DB files and sidecars
- legacy `user_{uuid}.db` if present
- `wrapped_decode_keys/user_{uuid}.json`
- `data/user_{uuid}/`
- `shared_logs/{uuid}_*.json`

## Support Rule

Do not delete files manually before checking whether the WordPress delete flow already ran.

Use the backend delete route through the WordPress plugin path whenever possible so caches and registry state are evicted too.

