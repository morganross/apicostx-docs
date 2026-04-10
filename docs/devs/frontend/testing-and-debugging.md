# Testing and Debugging

## First Smoke Tests

After frontend changes, manually or with Playwright verify:

- `/app/`
- `#/quality`
- `#/presets`
- `#/configure`
- `#/settings`

For a logged-in user, also confirm:

- `window.acm2Config.sessionToken` is present
- authenticated API requests succeed

## Logs

Important frontend log files in the plugin container:

- runtime error log:
  - `/bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/frontend-errors.log`
- CSP reports:
  - `/bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/csp-violations.log`

## Browser Tools

Playwright is useful for:

- route coverage
- DOM shape checks
- network request inspection
- checking whether lazy chunks load correctly

## Common Failure Classes

### Route-specific React crash

- check `frontend-errors.log`
- inspect the route's chunk loading
- confirm the app bundle is not loading twice

### Missing session token

- inspect `window.acm2Config`
- verify WordPress login state
- check the AJAX refresh flow

### CSP breakage

- inspect `csp-violations.log`
- compare the failing resource against current CSP allowances

### API failures

- inspect browser network requests
- check whether the request used `X-ACM2-Session-Token`
- check whether a `401` retry occurred

## Known Historical Bug

The `Quality` route previously failed because the lazy chunk caused the main entry bundle to be loaded under two URLs:

- `index-<hash>.js?ver=...`
- `index-<hash>.js`

That produced:

- React error `#321`
- `removeChild` / `NotFoundError`
- an error boundary fallback appended under `#root`

The fix was to stop query-string versioning the JavaScript ESM entry in the WordPress loader.
