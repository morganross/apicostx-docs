#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-}"

if [ -z "${TARGET_DIR}" ]; then
  echo "Usage: $0 /path/to/release" >&2
  exit 1
fi

if [ ! -d "${TARGET_DIR}" ]; then
  echo "Release directory does not exist: ${TARGET_DIR}" >&2
  exit 1
fi

if [ ! -f "${TARGET_DIR}/index.html" ]; then
  echo "Missing index.html in ${TARGET_DIR}" >&2
  exit 1
fi

if [ ! -d "${TARGET_DIR}/assets" ]; then
  echo "Missing assets directory in ${TARGET_DIR}" >&2
  exit 1
fi

for blocked in .git .github website docs node_modules package.json package-lock.json tsconfig.json; do
  if [ -e "${TARGET_DIR}/${blocked}" ]; then
    echo "Blocked file or directory found in release: ${blocked}" >&2
    exit 1
  fi
done

if find "${TARGET_DIR}" -type d \( -name .git -o -name .github \) | grep -q .; then
  echo "Nested git metadata found inside the release." >&2
  exit 1
fi

if find "${TARGET_DIR}" -perm -002 | grep -q .; then
  echo "World-writable files found in the release." >&2
  exit 1
fi

echo "Verified static docs release: ${TARGET_DIR}"
