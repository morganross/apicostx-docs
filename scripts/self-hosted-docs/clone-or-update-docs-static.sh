#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -eq 0 ]; then
  echo "Do not run this script as root. Use a dedicated docs user." >&2
  exit 1
fi

DOCS_REPO_URL="${DOCS_REPO_URL:-https://github.com/morganross/apicostx-docs.git}"
DOCS_BRANCH="${DOCS_BRANCH:-gh-pages}"
DOCS_ROOT="${DOCS_ROOT:-/srv/apicostx-docs}"
DOCS_REPO_DIR="${DOCS_REPO_DIR:-${DOCS_ROOT}/repo}"

mkdir -p "${DOCS_ROOT}"

if [ ! -d "${DOCS_REPO_DIR}/.git" ]; then
  git clone --depth 1 --branch "${DOCS_BRANCH}" "${DOCS_REPO_URL}" "${DOCS_REPO_DIR}"
else
  git -C "${DOCS_REPO_DIR}" remote set-url origin "${DOCS_REPO_URL}"
  git -C "${DOCS_REPO_DIR}" fetch --depth 1 origin "${DOCS_BRANCH}"
  git -C "${DOCS_REPO_DIR}" checkout -B "${DOCS_BRANCH}" "origin/${DOCS_BRANCH}"
  git -C "${DOCS_REPO_DIR}" reset --hard "origin/${DOCS_BRANCH}"
  git -C "${DOCS_REPO_DIR}" clean -fdx
fi

git -C "${DOCS_REPO_DIR}" rev-parse HEAD
