# Build, Assets, and Deploy

## Build System

The frontend is built with Vite.

Key config in `ui/vite.config.ts`:

- `base: './'`
- `outDir: '../assets/react-build'`
- hashed output filenames for entry, chunks, and assets

Build script in `ui/package.json`:

- `npm run build`

## Output Layout

The build produces:

- `assets/react-build/assets/index-<hash>.js`
- lazy chunks such as `assets/react-build/assets/Quality-<hash>.js`
- `assets/react-build/assets/index-<hash>.css`

## WordPress Loader

`includes/class-frontend-app.php` finds the built files with `glob(...)` and enqueues them into the page.

Important details:

- CSS is still versioned by filemtime in the WordPress enqueue call.
- The JavaScript module entry is intentionally not query-string versioned.
- The browser script tag is rewritten to `type="module"`.

## Why the JS Entry Must Not Use `?ver=...`

This is a critical rule for the current app.

If WordPress serves:

- `index-<hash>.js?ver=...`

but a lazy Vite chunk imports:

- `index-<hash>.js`

the browser treats those as two different module URLs and can load the app bundle twice. That previously broke the `Quality` route and produced React hook and DOM removal errors.

Use the hashed filename itself as the cache-busting mechanism for the JS entry.

## Deploy Notes

Frontend changes may live in two places:

- React source under `ui/src`
- WordPress/PHP integration under `includes/class-frontend-app.php`

Typical deployment flow:

1. update source
2. run `npm run build` from `ui`
3. verify `assets/react-build` contains the new output
4. if PHP changed, verify the loader and syntax
5. smoke-test `/app/`, `#/quality`, `#/presets`, and `#/settings`

## Safe Runtime Validation

After a deploy, confirm that `#/quality` requests:

- one `index-<hash>.js`
- one `Quality-<hash>.js`

and does not load the entry bundle under two different URLs.
