# API Cost X Docs

This repository contains the API Cost X documentation site built with Docusaurus and deployed to GitHub Pages.

## Layout

- `docs/`: Markdown source content
- `website/`: Docusaurus app and theme config
- `.github/workflows/`: build and deploy workflows for GitHub Pages

## Local development

```bash
cd website
npm install
npm run start
```

## Production build

```bash
cd website
npm run build
```

## GitHub Pages

The site is configured to deploy with GitHub Actions. In the repository settings, set:

- `Settings > Pages > Source = GitHub Actions`
