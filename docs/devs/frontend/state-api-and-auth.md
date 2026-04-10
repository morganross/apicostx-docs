# State, API, and Auth

## Client State

The frontend uses Zustand for shared client state and React Query for server state.

Important Zustand stores in `ui/src/stores`:

- `config.ts`
  - run configuration for general, FPF, GPTR, DR, eval, concurrency, and combine
- `presets.ts`
  - preset-related client state
- `run.ts`
  - active run state
- `notifications.ts`
  - toast-like notifications
- `settings.ts`
  - settings-related state

## Configuration Store

`stores/config.ts` is the biggest store and acts as the shared editable run configuration model.

It contains sections for:

- general
- fpf
- gptr
- dr
- ma
- eval
- concurrency
- combine

## API Layer

`ui/src/api/client.ts` is the main authenticated browser client.

Key behaviors:

- reads `apiUrl` from `window.acm2Config`
- prefers `X-ACM2-Session-Token`
- can still fall back to legacy `X-ACM2-API-Key`
- retries once after a `401` by asking WordPress for a new session token
- reports `5xx` errors through the frontend error reporter

API modules in `ui/src/api` are grouped by domain:

- presets
- runs
- contents
- models
- provider keys
- GitHub connections
- credits

## Auth Flow

1. WordPress injects `sessionToken` into `window.acm2Config`.
2. `api/client.ts` sends it as `X-ACM2-Session-Token`.
3. On `401`, the frontend posts to `/wp-admin/admin-ajax.php` with action `acm2_refresh_token`.
4. WordPress returns a refreshed session token.
5. The original request is retried once.

## GitHub Browser Flow

The GitHub add-connection UI in `components/settings/GitHubConnectionsPanel.tsx` performs the device flow from the browser itself.

That means:

- the app may make direct browser requests to GitHub
- `connect-src` in CSP must account for GitHub
- failures can be split between frontend browser flow and backend saved-connection validation
