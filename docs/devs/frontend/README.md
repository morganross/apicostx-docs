# Developer Guide: Frontend

This section documents the ACM frontend as it exists today: a Vite-built React app mounted into WordPress and served from the plugin.

## Read These First

- [architecture.md](architecture.md)
- [runtime-and-bootstrap.md](runtime-and-bootstrap.md)
- [state-api-and-auth.md](state-api-and-auth.md)
- [build-assets-and-deploy.md](build-assets-and-deploy.md)

## Source of Truth

The frontend code lives in the plugin container at:

- `ui/src` for React source
- `ui/package.json` for build scripts
- `ui/vite.config.ts` for bundling
- `includes/class-frontend-app.php` for WordPress mounting and browser bootstrap

## What Makes This Frontend Unusual

- assets are same-origin with WordPress
- API calls are cross-origin to `api.apicostx.com`
- auth state begins in WordPress PHP, not in a standalone SPA backend
- a session token is injected into `window.acm2Config`
- the app uses `HashRouter`
- only the `Quality` page is lazy-loaded today

## Frontend Ownership

Frontend changes often cross three layers:

1. React app code in `ui/src`
2. WordPress plugin PHP that injects assets and config
3. backend behavior that the browser depends on

When changing a user-facing flow, always think across all three.
