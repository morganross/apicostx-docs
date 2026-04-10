#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -eq 0 ]; then
  echo "Do not run this script as root. Use a dedicated docs user." >&2
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

DOCS_ROOT="${DOCS_ROOT:-/srv/apicostx-docs}"
DOCS_REPO_DIR="${DOCS_REPO_DIR:-${DOCS_ROOT}/repo}"
DOCS_RELEASES_DIR="${DOCS_RELEASES_DIR:-${DOCS_ROOT}/releases}"
DOCS_CURRENT_LINK="${DOCS_CURRENT_LINK:-${DOCS_ROOT}/current}"

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required for publish-docs-static.sh" >&2
  exit 1
fi

if [ ! -d "${DOCS_REPO_DIR}" ]; then
  echo "Docs repo checkout not found: ${DOCS_REPO_DIR}" >&2
  exit 1
fi

mkdir -p "${DOCS_RELEASES_DIR}"

TIMESTAMP="$(date -u +%Y-%m-%dT%H%M%SZ)"
RELEASE_DIR="${DOCS_RELEASES_DIR}/${TIMESTAMP}"
TEMP_LINK="${DOCS_CURRENT_LINK}.tmp"

mkdir -p "${RELEASE_DIR}"

rsync -a --delete \
  --exclude '.git' \
  --exclude '.github' \
  "${DOCS_REPO_DIR}/" "${RELEASE_DIR}/"

"${SCRIPT_DIR}/verify-docs-static.sh" "${RELEASE_DIR}"

ln -sfn "${RELEASE_DIR}" "${TEMP_LINK}"
mv -Tf "${TEMP_LINK}" "${DOCS_CURRENT_LINK}"

echo "Published static docs release: ${RELEASE_DIR}"
echo "Current symlink now points to: ${DOCS_CURRENT_LINK}"
