# User Guide: App Overview

The ACM app lives at `https://apicostx.com/app/`. It is a browser app inside the WordPress site, but most actions in the app talk directly to the ACM backend.

## Main Pages

- `Quality`: read-only charts and tables showing model quality and cost comparisons.
- `Presets`: saved configuration templates.
- `Configure`: edit a preset, choose models, and prepare a run.
- `Content Library`: manage documents, instructions, and evaluation criteria.
- `Execute`: start a run and watch progress.
- `History`: revisit completed or failed runs.
- `Settings`: manage provider credentials and GitHub connections.

## Sign-In Behavior

- If you are signed in through WordPress, the app receives an ACM session token automatically.
- If you are not signed in, some read-only or guest flows may still load, but actions that need ACM account access will be limited.
- If the app asks you to sign in again, use the normal WordPress sign-in flow.

## What the App Is Best At

- comparing model behavior across prompts or documents
- running repeatable evaluation workflows
- saving reusable presets instead of re-entering settings every time
- storing provider credentials once and reusing them across runs

## What the App Is Not

- It is not a general WordPress admin page.
- It is not a chat UI.
- It does not stream live updates over websockets. Browser updates come from normal HTTP requests.
