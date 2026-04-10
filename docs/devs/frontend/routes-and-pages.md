# Routes and Pages

## Current Route Map

The routes are defined in `ui/src/App.tsx`.

### `/quality`

- component: `pages/Quality.tsx`
- purpose: read-only quality and cost charts
- note: this is the only lazy-loaded route today

### `/presets`

- component: `pages/Presets.tsx`
- purpose: browse and manage preset definitions

### `/configure`

- component: `pages/Configure.tsx`
- purpose: build or edit a run configuration

### `/content`

- component: `pages/ContentLibrary.tsx`
- purpose: manage documents, prompt instructions, and evaluation criteria

### `/execute`

- component: `pages/Execute.tsx`
- purpose: create or monitor a run

### `/execute/:runId`

- component: `pages/Execute.tsx`
- purpose: resume an existing run detail view

### `/history`

- component: `pages/ExecutionHistory.tsx`
- purpose: list historical runs

### `/history/:id`

- component: `pages/ExecutionDetail.tsx`
- purpose: inspect a specific historical run

### `/settings`

- component: `pages/Settings.tsx`
- purpose: provider keys, GitHub connections, and account-facing integration settings

## Layout Responsibilities

`pages/Layout.tsx` owns:

- sidebar navigation
- latest-run shortcut behavior
- balance display
- mobile sidebar state
- page content shell through `<Outlet />`

## Frontend Page Clusters

- run setup:
  - Presets
  - Configure
- run execution:
  - Execute
  - History
  - Execution detail
- reference/admin surfaces:
  - Content Library
  - Settings
- static benchmark surface:
  - Quality
