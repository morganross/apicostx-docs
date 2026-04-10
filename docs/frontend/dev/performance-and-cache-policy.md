# Performance And Cache Policy

## Known Hotspots

Current heavy areas include:

- run detail assembly
- enriched result reconstruction
- export generation
- report generation
- large run execution state

## Results Reader Model

The backend reads normalized result tables and reconstructs API views on demand through `ResultsReader`.

This is better than blob storage, but it can still be heavy for large runs.

## Cache Policy

The app currently applies aggressive no-cache headers through `NoCacheMiddleware` in `app/main.py`.

That is safe for correctness, but expensive for immutable completed-run reads.

## Current Safe Reuse

The backend already reuses:

- `report.html`
- `export.zip`

Those are the correct first artifact-level reuse points.

## Next Performance Direction

The next likely wins are:

- optimize completed run detail/enriched reconstruction
- reduce large repeated payload assembly
- add selective caching only for terminal-state data if product rules allow it

