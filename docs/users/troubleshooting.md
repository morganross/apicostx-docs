# User Guide: Troubleshooting

## The app loads but actions fail

- Refresh the page once.
- Confirm you are still signed in to WordPress.
- Open Settings and make sure the needed provider keys are configured.

## The app asks me to sign in again

- Use the normal sign-in flow from the app or WordPress.
- After sign-in, return to `/app/` and retry.

## I cannot start a run

- Check that your preset or configuration has the required models selected.
- Check that your provider keys are present.
- If the run uses GitHub-imported content, test the GitHub connection first.

## GitHub connection says invalid

- Re-test the connection.
- Verify the repository, branch, and token.
- If the connection still fails, delete it and reconnect.

## I see stale or missing results

- Refresh the page.
- Reopen the run from History.
- If the issue continues, capture the run ID and ask an admin to check the frontend and backend logs.

## When to Contact Support

Contact support when:

- sign-in succeeds but the app still cannot access your ACM account
- Settings repeatedly says no ACM key or token is available
- runs fail immediately even with known-good credentials
- the UI shows a persistent error banner or error-boundary screen
