# Docusaurus + GitHub Pages Plan

This is the plan for turning the current docs into a Docusaurus site and publishing it with GitHub Pages and GitHub Actions.

It is based on the official Docusaurus docs and the official GitHub Pages and GitHub Actions docs.

## What We Are Building

We are building a documentation website, not just a folder of Markdown files.

The site should work like a help center and knowledge base for using the website. It should answer the normal user questions first:

- what the site is for
- how to get started
- what each main page does
- how provider keys and GitHub connections work
- what to do when something goes wrong

After that, it should also support admin and developer documentation.

## Main Recommendation

Use Docusaurus in docs-only mode and publish it with a custom GitHub Actions workflow to GitHub Pages.

Use one repository for both the source and the published site.

Keep the current Markdown content in a docs content folder, and put the Docusaurus app itself in a separate folder so we do not mix site code with doc content.

## Recommended Folder Shape

The cleanest layout is:

```text
repo/
├── docs/          # markdown content
└── website/       # Docusaurus app
```

Why this layout:

The current content already lives in `/docs`. Docusaurus also works well in a monorepo-style setup where the site app lives in `website/`. The official Docusaurus installation docs show this shape as a valid approach for existing projects.

This lets us keep the content and the website code separate.

## Recommended Docusaurus Setup

Create the site with the classic template inside `website/`.

Example command:

```bash
npx create-docusaurus@latest website classic
```

Use docs-only mode so the documentation lives at the site root instead of under `/docs/`.

That means:

- set the docs plugin `routeBasePath` to `/`
- set the docs plugin `path` to `../docs` so the Docusaurus app in `website/` reads the real docs folder we already have
- disable the blog unless we decide we really want a blog
- make one doc the homepage with `slug: /`
- remove the generated homepage in `src/pages/index.*` if it conflicts with the docs homepage

This matches the official Docusaurus docs-only mode guidance.

## Exact Repo Shape To Target

The target layout should be:

```text
repo/
├── docs/
│   ├── README.md
│   ├── help/
│   ├── users/
│   ├── admins/
│   ├── devs/
│   └── reference/
├── website/
│   ├── docusaurus.config.ts
│   ├── sidebars.ts
│   ├── package.json
│   ├── static/
│   └── src/
└── .github/
    └── workflows/
```

The important point is that the Markdown source stays in the real top-level `docs/` folder.

The Docusaurus app should live in `website/` and read from `../docs`.

That gives us one docs source of truth and keeps the site code separate from the docs content.

## Exact Docusaurus Config Decisions

The first implementation should use these choices:

- Docusaurus root: `website/`
- content root: `../docs`
- docs route base path: `/`
- blog: disabled
- one doc with `slug: /` as the homepage
- explicit `trailingSlash` in config
- `.nojekyll` in `website/static/`

The `docusaurus.config.ts` file should be treated as the main deployment truth:

- `url` should be the full published site origin
- `baseUrl` should match whether this is a project Pages site or a root-domain site
- `organizationName` should be the GitHub user or org
- `projectName` should be the repository name

If the site is published as `https://org.github.io/repo-name/`, then `baseUrl` should be `/repo-name/`.

If the site is published at the root of a custom domain or an org/user Pages root, then `baseUrl` should be `/`.

## Exact GitHub Actions Shape

Use two workflow files:

- `.github/workflows/docs-build.yml`
- `.github/workflows/docs-deploy.yml`

The build workflow should run on pull requests and only verify that the site builds.

The deploy workflow should run on pushes to the default branch and should publish the built site to GitHub Pages.

Because the Docusaurus app will live in `website/`, the workflows should either:

- set `defaults.run.working-directory: website`

or

- run the build commands with an explicit `working-directory: website`

The uploaded Pages artifact should be `website/build`.

The deploy workflow should:

- use the `github-pages` environment
- grant `pages: write` and `id-token: write`
- use `actions/deploy-pages@v4`

The Pages setting in GitHub must be:

- `Settings > Pages > Source = GitHub Actions`

## Recommended Information Architecture

The Docusaurus site should lead with help and self-service docs.

Top level:

- Help
- User Guides
- Admin Guides
- Developer Guides
- Reference

The first visible path on the site should be the help center, not the developer docs.

That means the landing page and top navigation should guide people into:

- what this site is for
- getting started
- main pages
- provider keys and GitHub
- account and access
- common problems

## Recommended GitHub Pages Approach

Use GitHub Pages with a custom GitHub Actions workflow.

This is the better fit here because Docusaurus needs a real build step. GitHub’s own Pages docs recommend a custom Actions workflow when you need a build process that is not the simple branch-and-Jekyll setup.

In repository settings:

`Settings > Pages > Source = GitHub Actions`

Do not use the old habit of manually pushing built files to a docs folder on `main` unless we have a strong reason to keep things that simple.

## Recommended GitHub Actions Flow

Use two workflows:

1. A pull request workflow that only tests the build.
2. A deploy workflow that builds and publishes on pushes to the default branch.

The official Docusaurus deployment docs show this pattern, and GitHub’s Pages docs show the current official Pages actions to use.

### Build job

The build job should:

- check out the repo
- set up Node
- install dependencies
- run the Docusaurus build
- upload the built site as a Pages artifact

### Deploy job

The deploy job should:

- depend on the build job
- use the `github-pages` environment
- have `pages: write` and `id-token: write` permissions
- use `actions/deploy-pages`

GitHub’s Pages docs are very explicit about those permissions and the environment requirement.

## Recommended Action Versions

Use the current GitHub Pages actions from GitHub’s own docs:

- `actions/checkout@v5`
- `actions/configure-pages@v5`
- `actions/upload-pages-artifact@v4`
- `actions/deploy-pages@v4`

The Docusaurus docs still show a valid example, but GitHub’s own Pages docs show newer versions of the Pages-related actions. We should follow GitHub’s current versions.

## Recommended Docusaurus Config Decisions

These values need to be set correctly before deployment:

- `url`
- `baseUrl`
- `organizationName`
- `projectName`
- `trailingSlash`

The big one is `baseUrl`.

If this is a project Pages site, the URL usually looks like:

`https://username.github.io/repo-name/`

In that case, `baseUrl` should usually be:

`/repo-name/`

If this is an organization or user site, or if we are using a custom domain, the URL can live at the root:

`https://docs.example.com/`

or

`https://username.github.io/`

In that case, `baseUrl` should usually be:

`/`

The official Docusaurus deployment docs are very clear that this part matters.

Also:

- set `trailingSlash` explicitly instead of leaving it undefined
- add `.nojekyll` so GitHub Pages does not let Jekyll strip files that begin with `_`

## Custom Domain Plan

If we use a custom domain:

- configure the custom domain in GitHub Pages settings
- configure the matching DNS records with the DNS provider

For a GitHub Pages site published by a custom Actions workflow, GitHub’s docs say the custom domain lives in the repository Pages settings. An existing `CNAME` file is not required there and should not be treated as the source of truth.

If we later decide we want a `CNAME` file in the built output for portability, we can add it deliberately, but the GitHub Pages settings must still be considered the real control point.

## Content Migration Plan

We already have real Markdown docs in `/docs`. We should not throw them away.

Migration should happen in stages:

### Stage 1

Move the current help-style and intro docs into the new Docusaurus docs structure.

### Stage 2

Create a real help center landing page and the first main sidebar.

### Stage 3

Move user, admin, and developer docs into clear sections with sidebars.

### Stage 4

Clean up filenames, front matter, slugs, and titles so the URLs and navigation feel intentional.

## Recommended Content Structure Inside Docusaurus

Inside the docs content, the first pass should look something like this:

```text
docs/
├── intro/
├── help/
├── users/
├── admins/
├── devs/
└── reference/
```

The help section should come first in the sidebar and should be the easiest part of the site to understand.

## Recommended Build and Local Dev Flow

Use the standard Docusaurus local commands:

```bash
cd website
npm install
npm run start
```

for local preview, and:

```bash
cd website
npm run build
```

for production build checks.

The official Docusaurus docs say the build output goes into `/build`.

The current Docusaurus install docs also require Node.js 20 or above, so the local and CI Node version should be 20+.

## Open Decisions We Need Before Implementation

These are the decisions that affect the config and deployment:

1. What repository will hold the Docusaurus site source?
2. Will the site live as a project Pages site or an org/user Pages site?
3. Are we using a custom domain from the start?
4. Do we want docs-only mode at the root, or do we want the site under `/docs/`?
5. Do we want a blog at all, or should we disable it now?
6. Do we want autogenerated sidebars from the folder structure, or do we want fully hand-written sidebars?

## Recommended Answers

My recommendations are:

1. Use the same repository as the docs source.
2. Use GitHub Pages with a custom GitHub Actions workflow.
3. Use docs-only mode.
4. Disable the blog for now.
5. Start with mostly autogenerated sidebars and only hand-tune where needed.
6. Use a custom domain only if we already know what it is and are ready to configure DNS right away.

## Implementation Phases

### Phase 1: Scaffold

- create `website/`
- install Docusaurus
- configure docs-only mode
- point docs content at the real docs folder with `path: '../docs'`
- remove the generated homepage if the docs homepage takes `/`

### Phase 2: Shape the site

- create navbar
- create sidebar structure
- create homepage doc
- move the help center docs into the first-class path

### Phase 3: Deploy

- add GitHub Pages workflows
- set Pages source to GitHub Actions
- make the workflows build from `website/`
- run PR build checks
- deploy from default branch

### Phase 4: Harden and polish

- add `.nojekyll`
- add `CNAME` if needed
- set `url`, `baseUrl`, `trailingSlash`
- test broken links
- test search, navigation, and mobile layout

## Success Checklist

We are done when:

- the docs build locally
- pull requests run a successful docs build check
- pushes to the default branch deploy automatically
- the site opens on GitHub Pages
- the homepage reads like a help center, not a source tree
- help docs are easy to find
- user, admin, and developer docs each have a clear home

## Official Sources Used

- Docusaurus installation:
  - https://docusaurus.io/docs/installation
- Docusaurus docs-only mode:
  - https://docusaurus.io/docs/docs-introduction
- Docusaurus doc slugs and root homepage:
  - https://docusaurus.io/docs/create-doc
- Docusaurus deployment:
  - https://docusaurus.io/docs/deployment
- GitHub Pages publishing source:
  - https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Pages custom workflows:
  - https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- GitHub Pages custom domain:
  - https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
