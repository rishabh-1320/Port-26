#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <framer-url> <output-dir>"
  echo "Example: $0 https://your-site.framer.website ./tmp/framer-mirror"
  exit 1
fi

FRAMER_URL="$1"
OUTPUT_DIR="$2"

mkdir -p "$OUTPUT_DIR"

echo "Mirroring $FRAMER_URL into $OUTPUT_DIR"
wget \
  --mirror \
  --convert-links \
  --adjust-extension \
  --page-requisites \
  --no-parent \
  --directory-prefix "$OUTPUT_DIR" \
  "$FRAMER_URL"

echo "Done. Use the mirrored HTML/CSS/assets as visual/content reference only."
