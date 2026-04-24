#!/usr/bin/env bash
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/dist"
mkdir -p "$OUT_DIR"
ZIP_PATH="$OUT_DIR/lily-chain-game.zip"

cd "$ROOT_DIR"
rm -f "$ZIP_PATH"
zip -r "$ZIP_PATH" \
  index.html styles.css game.js README.md ASSET_PROMPTS_KO.md run.sh run.bat assets tools \
  -x "*.DS_Store" "*.git*"

echo "Created: $ZIP_PATH"
