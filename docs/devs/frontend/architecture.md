# Frontend Architecture

## Deployment Shape

- WordPress origin: `https://apicostx.com`
- Backend API origin: `https://api.apicostx.com`
- Frontend mount point: the WordPress page containing the `[acm2_app]` shortcode

## High-Level Flow

1. WordPress renders the page shell.
2. The plugin prints `<div id="root" class="dark"></div>`.
3. WordPress enqueues the built React CSS and ESM entry bundle.
4. WordPress injects `window.acm2Config`.
5. React boots and mounts into `#root`.
6. Browser API calls go directly to the FastAPI backend.

## Main Building Blocks

- React entry:
  - `ui/src/main.tsx`
- Route map:
  - `ui/src/App.tsx`
- shared page layout:
  - `ui/src/pages/Layout.tsx`
- WordPress bridge:
  - `includes/class-frontend-app.php`
- API client:
  - `ui/src/api/client.ts`

## State Model

The app uses a mix of:

- React local state for page-local UI
- React Query for backend fetches and mutations
- Zustand stores for shared client-side state

Important store areas include:

- run configuration
- presets
- run state
- notifications
- settings

## Browser Security Shape

- assets come from the WordPress origin
- API calls are cross-origin
- auth is sent in custom headers
- CSP is enforced on the app page
- no websocket channel is currently part of the frontend design
