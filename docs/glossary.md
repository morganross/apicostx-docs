# Glossary

## Core Terms

- ACM / API Cost X: the product and codebase this documentation set covers.
- App page: the WordPress page that contains the `[acm2_app]` shortcode and mounts the React frontend.
- Preset: a saved configuration template that pre-fills run settings.
- Run: a single execution of one configured workflow against one or more documents and models.
- Content Library: stored prompt instructions, source documents, and evaluation criteria used by runs.
- Provider key: an API credential for a model or search provider such as OpenAI or Tavily.
- GitHub connection: a saved repository connection used to browse or import files from GitHub.
- Guest mode: frontend behavior when no ACM auth credential is available.
- Session token: the short-lived frontend auth token injected by WordPress into `window.acm2Config`.

## Workflow Terms

- Configure: the main page where presets and run parameters are edited.
- Execute: the page where a run is started and then monitored.
- History: the page listing previous runs.
- Quality: the route showing static model-quality comparison data and charts.
- FPF: FilePromptForge configuration and execution path.
- GPTR: GPT-Researcher configuration and execution path.
- DR: Deep Research configuration and execution path.
- Eval: the judging and scoring phase after generation.
- Combine: the post-processing step that merges or ranks outputs.

## Operational Terms

- `acm2Config`: the browser bootstrap object injected by WordPress PHP before the React app runs.
- ESM: JavaScript modules loaded with `type="module"`.
- CSP: Content-Security-Policy, the browser hardening header that controls what the page may load or execute.
- CORS: the backend browser-origin policy that allows `apicostx.com` to call `api.apicostx.com`.
