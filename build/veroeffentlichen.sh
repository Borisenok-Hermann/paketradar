#!/usr/bin/env bash
# Nach Änderungen in quelle/ (App + server/): baut index.html (unleserlich) und verschlüsselt die Quelle neu.
#   QUELLE_KEY='…' bash build/veroeffentlichen.sh
# Danach: sw.js CACHE-Version hochzählen, committen, pushen.
set -euo pipefail
cd "$(dirname "$0")/.."
: "${QUELLE_KEY:?QUELLE_KEY fehlt (Schlüssel bei Dennis erfragen)}"
[ -d build/node_modules ] || (cd build && npm ci --silent)
node build/build.js quelle/index.html index.html
tar czf - -C quelle . | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -pass env:QUELLE_KEY -out quelle.enc
echo "Fertig: index.html gebaut, quelle.enc aktualisiert"
