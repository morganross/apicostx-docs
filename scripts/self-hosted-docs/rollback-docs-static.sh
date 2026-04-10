#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -eq 0 ]; then
  echo "Do not run this script as root. Use a dedicated docs user." >&2
  exit 1
fi

DOCS_ROOT="${DOCS_ROOT:-/srv/apicostx-docs}"
DOCS_RELEASES_DIR="${DOCS_RELEASES_DIR:-${DOCS_ROOT}/releases}"
DOCS_CURRENT_LINK="${DOCS_CURRENT_LINK:-${DOCS_ROOT}/current}"
TEMP_LINK="${DOCS_CURRENT_LINK}.tmp"

TARGET_INPUT="${1:-}"

if [ -z "${TARGET_INPUT}" ]; then
  echo "Usage: $0 RELEASE_NAME_OR_ABSOLUTE_PATH" >&2
  exit 1
fi

if [[ "${TARGET_INPUT}" = /* ]]; then
  TARGET_DIR="${TARGET_INPUT}"
else
  TARGET_DIR="${DOCS_RELEASES_DIR}/${TARGET_INPUT}"
fi

if [ ! -d "${TARGET_DIR}" ]; then
  echo "Release directory does not exist: ${TARGET_DIR}" >&2
  exit 1
fi

ln -sfn "${TARGET_DIR}" "${TEMP_LINK}"
mv -Tf "${TEMP_LINK}" "${DOCS_CURRENT_LINK}"

echo "Rolled back current docs release to: ${TARGET_DIR}"
