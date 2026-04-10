# Runs, Reports, And Exports

## Runs

A run is a single execution of a preset against one or more source documents.

Runs move through statuses such as pending, running, paused, cancelled, failed, completed, and completed-with-errors.

## What A Run Stores

The backend stores run metadata in the per-user encrypted DB and stores run artifacts on disk under:

`data/user_{uuid}/runs/{run_id}/`

That run directory can contain generated markdown files, reports, exports, and related artifacts.

## Reports

Users can request a run report at:

`GET /api/runs/{run_id}/report`

The backend reuses `report.html` if it already exists. If it does not exist yet, the backend builds it from normalized run-result tables.

## Exports

Users can generate and download a ZIP export:

- `POST /api/runs/{run_id}/export`
- `GET /api/runs/{run_id}/export`

The backend now reuses an existing `export.zip` instead of rebuilding it on every read.

## Logs

Run logs are stored separately from the main user DB in a per-user sidecar logs database.

Users can access structured run logs through:

- `GET /api/runs/{run_id}/logs`
- `GET /api/runs/{run_id}/logs/count`

