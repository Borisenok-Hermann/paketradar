// Baut aus der lesbaren Quelle (src) die veröffentlichte, unleserliche index.html (out)
// Aufruf: node build.js <quelle/index.html> <ziel/index.html>
const fs = require('fs');
const JO = require('javascript-obfuscator');
const { minify } = require('html-minifier-terser');

const [src, out] = process.argv.slice(2);
const BANNER = "/* (c) 2026 Dennis Hermann. Paketradar. Alle Rechte vorbehalten. Nutzung, Kopie oder Weitergabe nur mit schriftlicher Erlaubnis. */\n";

// Sicherheitsregeln für den Browser: nur eigene Dateien, keine fremden Skripte, keine Datenübertragung an andere Server
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'"
].join('; ');

(async () => {
  let html = fs.readFileSync(src, 'utf8');
  let n = 0;
  html = html.replace(/<script>([\s\S]*?)<\/script>/g, (m, code) => {
    n++;
    const ob = JO.obfuscate(code, {
      compact: true, target: 'browser', seed: 11,
      identifierNamesGenerator: 'hexadecimal', renameGlobals: false,
      stringArray: true, stringArrayThreshold: 0.8, stringArrayRotate: true, stringArrayShuffle: true,
      stringArrayWrappersCount: 1, stringArrayEncoding: [],
      controlFlowFlattening: false, deadCodeInjection: false, selfDefending: false,
      transformObjectKeys: false, unicodeEscapeSequence: false, numbersToExpressions: false,
      splitStrings: false, simplify: true
    }).getObfuscatedCode();
    return '<script>' + BANNER + ob.replace(/<\/script/gi, '<\\/script') + '</script>';
  });
  html = await minify(html, { collapseWhitespace: true, conservativeCollapse: true, removeComments: true, minifyCSS: true, minifyJS: false, keepClosingSlash: true });
  html = html.replace('<head>', `<head><!-- (c) 2026 Dennis Hermann. Paketradar. Alle Rechte vorbehalten. --><meta http-equiv="Content-Security-Policy" content="${CSP}">`);
  fs.writeFileSync(out, html);
  console.log(`ok: ${n} Skript(e), ${fs.statSync(src).size} -> ${fs.statSync(out).size} Bytes`);
})().catch(e => { console.error(e); process.exit(1); });
