# Common Workflows

## 1. Check Health

If you are testing connectivity, start here:

```bash
curl -sS https://api.apicostx.com/api/health
```

This does not require user auth.

## 2. List Presets

Once you have a session token:

```bash
curl -sS \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/presets
```

## 3. List Contents

```bash
curl -sS \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  "https://api.apicostx.com/api/contents?page=1&page_size=20"
```

## 4. Create A Run

Runs are created from an existing preset.

```bash
curl -sS \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  -d '{"name":"My Run","preset_id":"PRESET_ID","description":"test"}' \
  https://api.apicostx.com/api/runs
```

## 5. Start A Run

```bash
curl -sS \
  -X POST \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/runs/RUN_ID/start
```

## 6. Poll Run Status

```bash
curl -sS \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/runs/RUN_ID
```

Or get list/count views:

- `GET /api/runs`
- `GET /api/runs/count`

## 7. Get A Report

```bash
curl -L \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/runs/RUN_ID/report
```

The backend reuses an existing `report.html` when it already exists.

## 8. Generate And Download An Export

First build the export:

```bash
curl -sS \
  -X POST \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/runs/RUN_ID/export
```

Then download it:

```bash
curl -L \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  -o export.zip \
  https://api.apicostx.com/api/runs/RUN_ID/export
```

## 9. Save Provider Keys

Users can save their own provider keys:

```bash
curl -sS \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  -d '{"provider":"openai","api_key":"sk-..."}' \
  https://api.apicostx.com/api/provider-keys
```

## 10. Check Credits

```bash
curl -sS \
  -H "X-ACM2-Session-Token: $SESSION_TOKEN" \
  https://api.apicostx.com/api/credits
```

