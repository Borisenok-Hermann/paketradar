#!/usr/bin/env bash
# Entpackt die lesbare Quelle nach quelle/index.html.
# Schlüssel steht bei Dennis (nicht im Repo gespeichert):
#   QUELLE_KEY='…' bash build/entschluesseln.sh
set -euo pipefail
cd "$(dirname "$0")/.."
: "${QUELLE_KEY:?QUELLE_KEY fehlt (Schlüssel bei Dennis erfragen)}"
mkdir -p quelle
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:QUELLE_KEY -in quelle.enc | tar xzf - -C quelle
echo "Lesbare Quelle: quelle/index.html und quelle/server/"
