# Admin Guide: Updating the Self-Hosted Docs

The docs source lives in GitHub. GitHub Actions builds the static site. This frontend server does not build the docs source for production.

When you want to publish an update, the job is simple: make the source change, let GitHub build it, then pull the already-built files onto the server.

## What Lives Where

The source repo is `morganross/apicostx-docs`.

The editable docs, Docusaurus config, and theme files live on the `main` branch.

The built static output is published to the `gh-pages` branch by GitHub Actions.

This frontend server serves the built files from `/srv/apicostx-docs/current` at `https://apicostx.com/docs-static/`.

## Normal Update Flow

First, make your docs or theme changes in the source repo and push them to `main`.

Then wait for the GitHub Actions deploy workflow to finish successfully. The important result is that the `gh-pages` branch has the new built files.

After that, log into the frontend server and pull the new built branch:

```bash
sudo -u docsdeploy /srv/apicostx-docs/bin/clone-or-update-docs-static.sh
```

Then publish the pulled build into a fresh release folder and switch the live symlink:

```bash
sudo -u docsdeploy /srv/apicostx-docs/bin/publish-docs-static.sh
```

That is the normal update. No Docusaurus build should run on this server for production.

## Quick Check After Updating

Open these pages and make sure they load:

- `https://apicostx.com/docs-static/`
- `https://apicostx.com/docs-static/help`
- `https://apicostx.com/docs-static/help/getting-started`

You can also do a simple header check:

```bash
curl -I https://apicostx.com/docs-static/
curl -I https://apicostx.com/docs-static/help
```

If those pages load and the CSS/JS assets are present, the update is live.

## If Something Looks Wrong

If the GitHub build failed, do not pull anything to the server. Fix the source repo and wait for a successful build.

If the server pull worked but the site looks wrong, check that `/srv/apicostx-docs/current` points at the newest release under `/srv/apicostx-docs/releases/`.

If you need to go back to the previous release, use the rollback script:

```bash
sudo -u docsdeploy /srv/apicostx-docs/bin/rollback-docs-static.sh
```

That will move the `current` symlink back to the previous release folder.

## Important Rule

This server is only for serving the built files.

Do not treat `/srv/apicostx-docs` as the editable source repo. The source of truth is still GitHub.
