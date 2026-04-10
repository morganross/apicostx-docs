# Runtime and Bootstrap

## React Startup

The frontend entry point is `ui/src/main.tsx`.

Startup order:

1. create a React Query client
2. call `ReactDOM.createRoot(document.getElementById('root')!)`
3. wrap the app in:
   - `React.StrictMode`
   - `QueryClientProvider`
   - `HashRouter`
   - `ErrorBoundary`

## Route Shell

`ui/src/App.tsx` mounts `Layout` at `/` and nests the app routes beneath it.

Important route notes:

- the index route redirects to `/quality`
- the `Quality` page is lazy-loaded
- the app uses hash routing, so browser URLs look like `/app/#/quality`

## WordPress Bootstrap

`includes/class-frontend-app.php` is the bridge between WordPress and the SPA.

It is responsible for:

- detecting pages with the `[acm2_app]` shortcode
- locating the built CSS and JS files
- enqueuing the built assets
- ensuring the JS entry is loaded as `type="module"`
- injecting `window.acm2Config`
- adding app-page CSS and small inline layout JS

## `acm2Config`

The current bootstrap object includes fields such as:

- `apiUrl`
- `nonce`
- `currentUser`
- `userUuid`
- `sessionToken`
- `demoDataUrl`
- `loginUrl`
- `registerUrl`

The frontend expects this object to exist before the React bundle runs.

## Guest vs Logged-In Runtime

- Logged-in users get a session token from WordPress PHP.
- Guests may still load the app shell, but credentialed actions are limited.
- The API client can fall back to guest behavior for some read-only flows.

## Error Boundary

The top-level error boundary reports frontend errors through `api/errorReporter.ts` and renders a fallback UI instead of crashing the whole page.
