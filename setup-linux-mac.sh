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
    log "Loading nvm and installing Node.js LTS"
    export NVM_DIR="$HOME/.nvm"
    # shellcheck disable=SC1091
    . "$NVM_DIR/nvm.sh"
    nvm install --lts
    nvm alias default lts/*
    return 0
  fi

  if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v brew >/dev/null 2>&1; then
      log "Installing Node.js with Homebrew"
      brew install node
      return 0
    fi
  fi

  if command -v apt-get >/dev/null 2>&1; then
    log "Installing Node.js with apt"
    sudo apt-get update
    sudo apt-get install -y nodejs npm
    return 0
  fi

  if command -v dnf >/dev/null 2>&1; then
    log "Installing Node.js with dnf"
    sudo dnf install -y nodejs npm
    return 0
  fi

  if command -v yum >/dev/null 2>&1; then
    log "Installing Node.js with yum"
    sudo yum install -y nodejs npm
    return 0
  fi

  if command -v pacman >/dev/null 2>&1; then
    log "Installing Node.js with pacman"
    sudo pacman -S --noconfirm nodejs npm
    return 0
  fi

  echo "Node.js could not be installed automatically. Please install Node.js 18+ manually and rerun this script." >&2
  exit 1
}

main() {
  log "Checking Node.js"
  ensure_node

  NODE_BIN="$(command -v node)"
  NPM_BIN="$(command -v npm)"
  if [ -z "$NODE_BIN" ] || [ -z "$NPM_BIN" ]; then
    echo "Node.js or npm could not be found after installation." >&2
    exit 1
  fi

  export PATH="$(dirname "$NODE_BIN"):$PATH"

  echo "Using Node.js $(node --version)"

  log "Installing project dependencies"
  cd "$PROJECT_DIR"
  npm ci --no-audit --fund=false

  log "Building the local interface"
  npm run build

  log "Validating the installation"
  npm run check

  echo
  echo "DM Tool is ready."
  echo "Use ./run.sh whenever you want to start the app."
}

main "$@"
