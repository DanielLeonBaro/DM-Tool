#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log() {
  echo
  echo "==> $*"
}

ensure_node() {
  if command -v node >/dev/null 2>&1; then
    return 0
  fi

  if [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    # shellcheck disable=SC1091
    . "$NVM_DIR/nvm.sh"
    nvm use --lts >/dev/null 2>&1 || nvm install --lts >/dev/null 2>&1
    return 0
  fi

  echo "Node.js is required but was not found. Run ./setup.sh first." >&2
  exit 1
}

main() {
  log "Checking Node.js"
  ensure_node

  NODE_BIN="$(command -v node)"
  if [ -z "$NODE_BIN" ]; then
    echo "Node.js could not be found." >&2
    exit 1
  fi

  export PATH="$(dirname "$NODE_BIN"):$PATH"
  cd "$PROJECT_DIR"

  if [ ! -d "node_modules/express" ]; then
    log "Installing dependencies"
    npm ci --no-audit --fund=false
  fi

  echo "DM Tool is running at http://localhost:3000"
  echo "Press Ctrl+C to stop it."
  exec node backend/server.js
}

main "$@"
