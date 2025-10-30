# Reverse String

A tiny web page that reverses any text you type—**grapheme-aware** (works correctly with emojis and accented characters).

## How to run
Just open `index.html` in your browser. No build step, no dependencies.

## Features
- Uses `Intl.Segmenter` when available for proper grapheme segmentation.
- Fallback to `Array.from` for wide browser support.
- Keyboard shortcut: **Ctrl/⌘ + Enter** to reverse.
- Copy result to clipboard.
- Accessible: labeled form, `aria-live` for updates, focus management.

## Files
- `index.html` – markup
- `styles.css` – minimal styling
- `script.js` – logic (documented)
- `prompts.md` – the exact prompt used + chatbot info (required by assignment)

## Browser support
- Modern browsers support `Intl.Segmenter`. Fallback handles most cases if not supported.
