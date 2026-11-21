# Paketradar – Sendungsverfolgung

Sendungen von DHL, Deutsche Post, DPD, GLS, UPS und Hermes an einem Ort sammeln. Der Paketdienst wird am Format der Sendungsnummer erkannt, „Verfolgen“ öffnet die offizielle Seite des Dienstes.

© 2026 Dennis Hermann. **Alle Rechte vorbehalten** – siehe `LICENSE`.

Installation auf dem iPhone: Seite in Safari öffnen → Teilen → „Zum Home-Bildschirm“.
Auf Android: Seite in Chrome öffnen → Menü → „App installieren“.

Datenschutz: Alle Sendungen bleiben auf dem Gerät (Browser-Speicher). Es werden keine Daten an einen Server geschickt, Schriften und Icons liegen im Repo.

---

## Für Claude / Entwickler: `index.html` NICHT direkt bearbeiten

`index.html` ist die **gebaute, unleserliche** Fassung. Die lesbare Quelle liegt verschlüsselt in `quelle.enc`.
Der Schlüssel liegt **nicht** im Repo, nur bei Dennis.

So wird geändert:

```bash
export QUELLE_KEY='…'            # bei Dennis erfragen
bash build/entschluesseln.sh     # -> quelle/index.html (lesbar, wird nicht committet)
# … quelle/index.html bearbeiten und testen …
bash build/veroeffentlichen.sh   # baut index.html + verschlüsselt quelle.enc neu
# sw.js: CACHE-Version hochzählen, dann committen und pushen
```
