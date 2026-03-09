#!/usr/bin/env bash
# export-handbook-pdf.sh
# Exports HANDBOOK.md to HANDBOOK.pdf
# Usage: ./export-handbook-pdf.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INPUT="$SCRIPT_DIR/HANDBOOK.md"
OUTPUT="$SCRIPT_DIR/HANDBOOK.pdf"

echo "======================================"
echo "  Legal Cameroun — Handbook PDF Export"
echo "======================================"
echo ""

if [ ! -f "$INPUT" ]; then
  echo "ERROR: $INPUT not found. Run this script from the project root."
  exit 1
fi

# ──────────────────────────────────────────
# Strategy 1: pandoc (best output quality)
# ──────────────────────────────────────────
if command -v pandoc &>/dev/null; then
  echo "✓ pandoc found. Attempting PDF generation..."

  # Try xelatex first (best Unicode + font support)
  if command -v xelatex &>/dev/null; then
    echo "  → Using xelatex engine"
    pandoc "$INPUT" -o "$OUTPUT" \
      --pdf-engine=xelatex \
      --variable geometry:margin=2cm \
      --variable fontsize=11pt \
      --variable mainfont="DejaVu Sans" \
      --toc \
      --toc-depth=3 \
      --highlight-style=tango \
      -V colorlinks=true \
      -V linkcolor=blue \
      -V urlcolor=blue \
      2>&1

    if [ -f "$OUTPUT" ]; then
      echo ""
      echo "✅ SUCCESS: $OUTPUT generated with pandoc + xelatex"
      echo "   File size: $(du -sh "$OUTPUT" | cut -f1)"
      exit 0
    fi
  fi

  # Try wkhtmltopdf if xelatex not available
  if command -v wkhtmltopdf &>/dev/null; then
    echo "  → xelatex not available, trying wkhtmltopdf engine"
    pandoc "$INPUT" -o "$OUTPUT" \
      --pdf-engine=wkhtmltopdf \
      --variable margin-top=20mm \
      --variable margin-right=20mm \
      --variable margin-bottom=20mm \
      --variable margin-left=20mm \
      --toc \
      --toc-depth=3 \
      2>&1

    if [ -f "$OUTPUT" ]; then
      echo ""
      echo "✅ SUCCESS: $OUTPUT generated with pandoc + wkhtmltopdf"
      echo "   File size: $(du -sh "$OUTPUT" | cut -f1)"
      exit 0
    fi
  fi

  # Try weasyprint
  if command -v weasyprint &>/dev/null; then
    echo "  → Trying weasyprint engine"
    pandoc "$INPUT" -o /tmp/handbook.html --standalone --toc --toc-depth=3 2>&1
    weasyprint /tmp/handbook.html "$OUTPUT" 2>&1

    if [ -f "$OUTPUT" ]; then
      echo ""
      echo "✅ SUCCESS: $OUTPUT generated with pandoc + weasyprint"
      exit 0
    fi
  fi

  # Pandoc without a PDF engine — generates HTML, then we'll use another method
  echo "  → No PDF engine found alongside pandoc. Generating HTML intermediate..."
  pandoc "$INPUT" -o /tmp/handbook_export.html \
    --standalone \
    --toc \
    --toc-depth=3 \
    --highlight-style=tango \
    --css=/dev/null \
    2>&1

  echo ""
  echo "  HTML generated at /tmp/handbook_export.html"
  echo "  Install a PDF engine to auto-convert:"
  echo "    macOS: brew install --cask basictex   (xelatex)"
  echo "    macOS: brew install wkhtmltopdf"
  echo "    Any:   pip install weasyprint"
fi

# ──────────────────────────────────────────
# Strategy 2: Chromium / Chrome headless
# ──────────────────────────────────────────
CHROME_BIN=""
for candidate in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(command -v chromium 2>/dev/null || true)" \
  "$(command -v chromium-browser 2>/dev/null || true)" \
  "$(command -v google-chrome 2>/dev/null || true)" \
  "$(command -v google-chrome-stable 2>/dev/null || true)"; do
  if [ -n "$candidate" ] && [ -x "$candidate" ]; then
    CHROME_BIN="$candidate"
    break
  fi
done

if [ -n "$CHROME_BIN" ]; then
  echo "✓ Chromium/Chrome found at: $CHROME_BIN"
  echo "  → Attempting headless PDF print..."

  # First convert MD to HTML using pandoc if available, else use basic wrapper
  HTML_INPUT="/tmp/handbook_chrome.html"

  if command -v pandoc &>/dev/null; then
    pandoc "$INPUT" -o "$HTML_INPUT" \
      --standalone \
      --toc --toc-depth=3 \
      --highlight-style=tango \
      --metadata title="Legal Cameroun — Technical Handbook" \
      2>&1
  else
    # Minimal wrapper: embed raw markdown (Chrome won't render it natively, just a fallback)
    echo "<html><head><meta charset='utf-8'><title>Legal Cameroun Handbook</title></head><body><pre>" > "$HTML_INPUT"
    cat "$INPUT" >> "$HTML_INPUT"
    echo "</pre></body></html>" >> "$HTML_INPUT"
  fi

  "$CHROME_BIN" \
    --headless=new \
    --disable-gpu \
    --no-sandbox \
    --print-to-pdf="$OUTPUT" \
    --print-to-pdf-no-header \
    --run-all-compositor-stages-before-draw \
    "file://$HTML_INPUT" \
    2>&1

  if [ -f "$OUTPUT" ]; then
    echo ""
    echo "✅ SUCCESS: $OUTPUT generated with Chrome headless"
    echo "   File size: $(du -sh "$OUTPUT" | cut -f1)"
    exit 0
  fi
fi

# ──────────────────────────────────────────
# Strategy 3: Node.js puppeteer (if available)
# ──────────────────────────────────────────
if command -v node &>/dev/null && [ -f "$SCRIPT_DIR/node_modules/.bin/puppeteer" ]; then
  echo "✓ Puppeteer found. Attempting PDF generation..."
  node -e "
const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const html = fs.readFileSync('/tmp/handbook_chrome.html', 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: '$OUTPUT', format: 'A4', margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' }, printBackground: true });
  await browser.close();
})();
" 2>&1

  if [ -f "$OUTPUT" ]; then
    echo ""
    echo "✅ SUCCESS: $OUTPUT generated with puppeteer"
    exit 0
  fi
fi

# ──────────────────────────────────────────
# No automated method succeeded — show instructions
# ──────────────────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Could not auto-generate PDF. Manual options:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "OPTION 1 — VS Code (recommended, renders Mermaid diagrams):"
echo "  1. Open HANDBOOK.md in VS Code"
echo "  2. Install extensions:"
echo "     - 'Markdown PDF' by yzane"
echo "     - 'Markdown Preview Mermaid Support' by Matt Bierner"
echo "  3. Right-click in editor → 'Markdown PDF: Export (pdf)'"
echo ""
echo "OPTION 2 — Install pandoc + xelatex:"
echo "  macOS:  brew install pandoc && brew install --cask basictex"
echo "  Ubuntu: sudo apt install pandoc texlive-xetex"
echo "  Then re-run: ./export-handbook-pdf.sh"
echo ""
echo "OPTION 3 — Install wkhtmltopdf:"
echo "  macOS:  brew install wkhtmltopdf"
echo "  Ubuntu: sudo apt install wkhtmltopdf"
echo "  Then re-run: ./export-handbook-pdf.sh"
echo ""
echo "OPTION 4 — Browser print:"
echo "  1. Run: npm run dev"
echo "  2. Open: http://localhost:3000  (or use a Markdown viewer)"
echo "  3. Or open HANDBOOK.md in GitHub / GitLab which renders it"
echo "  4. Use browser Print → Save as PDF"
echo ""
echo "OPTION 5 — Online converter:"
echo "  Upload HANDBOOK.md to https://pandoc.org/try/ and select PDF output"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Mermaid diagram viewers (to see diagrams before printing):"
echo "  - VS Code: 'Markdown Preview Mermaid Support' extension"
echo "  - GitHub: diagrams render natively in .md files"
echo "  - Obsidian: built-in Mermaid support"
echo "  - https://mermaid.live — paste diagram code"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

exit 1
