# Run Lifecycle

## Creation

Runs are created from presets through `POST /api/runs`.

The route loads preset config, resolves input documents, and writes a pending run row to the user's DB.

## Execution

`POST /api/runs/{run_id}/start` launches background execution.

`RunExecutor` coordinates generation, evaluation, pairwise work, combination, logging, and DB persistence.

## Persistence Pattern

The backend does not rely on one giant in-memory result blob anymore.

Callbacks write normalized rows during execution, and `ResultsReader` reconstructs result views later for API responses, reports, and exports.

## Control Endpoints

Execution control endpoints include:

- start
- pause
- resume
- cancel
- checkpoint view
- skip task

## Artifacts

Run artifacts live under:

`data/user_{uuid}/runs/{run_id}/`

Important artifact endpoints include:

- report
- logs
- generated document content
- export

