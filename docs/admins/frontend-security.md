# Admin Guide: Frontend Security

This page summarizes the browser-side security model for the frontend.

## Current Browser Model

- Page origin: `https://apicostx.com`
- API origin: `https://api.apicostx.com`
- Auth for app API calls: explicit auth header, not browser cookies for backend auth
- WordPress injects `window.acm2Config` into the page before the React app starts

## Important Security Facts

- The app currently uses a short-lived session token in `window.acm2Config.sessionToken`.
- WordPress also provides a nonce used for AJAX token refresh.
- The page is protected with enforced CSP on `/app/`.
- The backend allows the frontend origin through CORS.

## Current Frontend-Relevant Headers

The WordPress app page now returns:

- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- enforced `Content-Security-Policy`

## CSP Notes

The current app CSP is designed around the real deployment:

- scripts are served from the WordPress origin
- API requests go to `api.apicostx.com`
- GitHub device-flow requests may go directly to GitHub from the browser
- a few inline WordPress/plugin scripts are allowed via nonce

## Admin Risks to Watch

- new third-party scripts added to the app page
- new CSP violations in the CSP report log
- frontend code changes that reintroduce duplicate ESM URLs
- stale or overly broad CORS settings on the backend
- UI paths that expose secrets too visibly

## Relevant Logs

- frontend runtime errors:
  - `/bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/frontend-errors.log`
- CSP reports:
  - `/bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/csp-violations.log`
