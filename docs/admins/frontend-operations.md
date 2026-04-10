# Admin Guide: Frontend Operations

This guide covers the live frontend surface for ACM on WordPress.

## Current Shape

- Public app URL: `https://apicostx.com/app/`
- Page shell and assets are served by WordPress.
- The React build is loaded from the plugin under `assets/react-build`.
- Browser API calls go to `https://api.apicostx.com/api`.

## Frontend Container

- Container name: `wordpress-wordpress-1`

Useful operational actions:

- Restart the frontend container:
  - `docker restart wordpress-wordpress-1`
- Check the public app page:
  - `curl -I https://apicostx.com/app/`
- Inspect plugin frontend logs:
  - `docker exec wordpress-wordpress-1 bash -lc "tail -n 50 /bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/frontend-errors.log"`
- Inspect CSP reports:
  - `docker exec wordpress-wordpress-1 bash -lc "tail -n 50 /bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/csp-violations.log"`

## What Lives Where

- WordPress integration and asset loader:
  - `includes/class-frontend-app.php`
- React source:
  - `ui/src`
- Built frontend assets:
  - `assets/react-build`

## Basic Health Check

A good quick check after frontend changes is:

1. Load `/app/`
2. Load `#/quality`
3. Load `#/presets`
4. Load `#/settings`
5. Confirm no new entries appear in `frontend-errors.log`

## Important Operational Note

The frontend entry bundle is now loaded as a plain hashed ESM file, without a `?ver=` query string. This is intentional. Query-string versioning on the JavaScript entry caused the lazy Quality route to load the app bundle twice and break React.
