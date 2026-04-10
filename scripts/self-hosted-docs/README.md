# Self-Hosted Docs Scripts

These scripts are for a pull-based static docs deploy.

The idea is:

1. GitHub Actions builds the Docusaurus site.
2. GitHub Actions publishes only the built static files to a deploy branch.
3. The server pulls that deploy branch.
4. The server copies the static files into a timestamped release directory.
5. The web server serves the `current` symlink target.

These scripts are meant to run on the server as a dedicated non-root docs user.

## Default Assumptions

- repo URL: `https://github.com/morganross/apicostx-docs.git`
- deploy branch: `gh-pages`
- docs root: `/srv/apicostx-docs`

## Scripts

- `clone-or-update-docs-static.sh`
  - clones or updates the deploy branch checkout
- `publish-docs-static.sh`
  - copies the checkout into a new release directory and atomically switches `current`
- `verify-docs-static.sh`
  - checks that the release looks like a safe Docusaurus static site
- `rollback-docs-static.sh`
  - points `current` back to an older release
- `deploy-docs-static.sh`
  - convenience wrapper: update repo, publish release, verify result

## Important Security Notes

- Do not run these scripts as `root`.
- Do not point the web server directly at the Git checkout.
- If the deploy branch is private, use a read-only deploy key on the server.
- Only the built static branch should be cloned onto the server.
