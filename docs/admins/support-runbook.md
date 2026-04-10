# Admin Guide: Frontend Support Runbook

Use this runbook when a user reports a frontend problem.

## 1. Confirm the Problem Shape

Ask:

- which page failed
- whether the user was signed in
- whether the issue affects all pages or one page
- whether the issue is a visual failure, auth failure, or run failure

## 2. Check the Public Surface

- `curl -I https://apicostx.com/app/`
- Confirm the page returns `200`
- Confirm the expected security headers are still present

## 3. Check Frontend Error Logs

- `docker exec wordpress-wordpress-1 bash -lc "tail -n 100 /bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/frontend-errors.log"`

Look for:

- React runtime errors
- `removeChild` or DOM errors
- repeated `401`-driven failures
- route-specific failures such as `#/quality`

## 4. Check CSP Reports

- `docker exec wordpress-wordpress-1 bash -lc "tail -n 100 /bitnami/wordpress/wp-content/plugins/acm-wordpress-plugin/logs/csp-violations.log"`

Use this when a page suddenly stops loading scripts, fonts, styles, or external requests.

## 5. Common Frontend Incidents

### App page loads, but API actions fail

- likely auth, token refresh, or backend issue
- confirm WordPress sign-in state
- confirm backend health separately

### Settings page cannot load credentials

- likely missing ACM auth credential or backend auth failure
- confirm the user is signed in and provisioned

### Quality page or another route shows an error boundary

- check `frontend-errors.log`
- check whether a lazy chunk or module-loading change was deployed
- verify the page is not loading the same ESM bundle under two different URLs

### GitHub connection flows fail

- determine whether the failure is in browser device flow, saved connection validation, or backend GitHub calls
- confirm whether `githubClientId` is present in the page bootstrap

## 6. Safe First Response

If the frontend looks unhealthy after a PHP or plugin change:

1. restart `wordpress-wordpress-1`
2. reload `/app/`
3. retest `#/quality`, `#/presets`, and `#/settings`
4. re-check logs
