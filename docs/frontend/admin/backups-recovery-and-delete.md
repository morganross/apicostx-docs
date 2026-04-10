# Backups, Recovery, And Delete

## What Lives On Disk

The backend stores user state in three main places:

- per-user encrypted DB files: `paid_{uuid}.db` or `free_{uuid}.db`
- per-user runtime/artifact directories: `data/user_{uuid}/runs/...`
- recovery files: `data/user_{uuid}.recovery`

There is also a shared credits DB and shared logs for operator review.

## Recovery Files

`user_{uuid}.recovery` contains a wrapped copy of the user's DB key.

It is sensitive and should be handled like a recovery secret, not as ordinary content.

## Delete Behavior

The backend delete endpoint removes:

- active free/paid DB files and sidecars
- legacy `user_{uuid}.db` if present
- `user_{uuid}.recovery`
- `data/user_{uuid}/`
- `shared_logs/{uuid}_*.json`

## Support Rule

Do not delete files manually before checking whether the WordPress delete flow already ran.

Use the backend delete route through the WordPress plugin path whenever possible so caches and registry state are evicted too.

