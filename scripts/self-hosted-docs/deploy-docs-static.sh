#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

"${SCRIPT_DIR}/clone-or-update-docs-static.sh"
"${SCRIPT_DIR}/publish-docs-static.sh"
