/**
 * Reverse String App
 * ------------------
 * This reverses user input in a grapheme-aware way (handles emojis,
 * accented letters, flags, skin tones, etc.). It tries Intl.Segmenter first,
 * and falls back safely to Array.from if not available.
 *
 * Usage:
 *  - Type in the textarea, click "Reverse" or press Enter (Ctrl+Enter on multiline).
 *  - "Clear" empties the input and output.
 *  - "Copy result" copies the reversed text to the clipboard.
 */

/**
 * Reverse a string by grapheme clusters.
 * Grapheme clusters ≈ user-perceived characters.
 */
function reverseByGraphemes(str) {
    if (typeof Intl !== "undefined" && typeof Intl.Segmenter === "function") {
      // Use grapheme segmenter where supported
      const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
      const parts = Array.from(seg.segment(str), s => s.segment);
      return parts.reverse().join("");
    }
    // Fallback: Array.from gives codepoints; good enough for most cases
    return Array.from(str).reverse().join("");
  }
  
  /**
   * Wire up UI events
   */
  (function init() {
    const form = document.getElementById("reverse-form");
    const input = document.getElementById("inputText");
    const result = document.getElementById("result");
    const status = document.getElementById("status");
    const reverseBtn = document.getElementById("reverseBtn");
    const clearBtn = document.getElementById("clearBtn");
    const copyBtn = document.getElementById("copyBtn");
  
    // Submit: reverse text
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value || "";
      const reversed = reverseByGraphemes(text);
      result.textContent = reversed;
      status.textContent = text.length
        ? `Reversed ${text.length} character(s).`
        : "Nothing to reverse.";
      result.focus();
    });
  
    // Keyboard: Ctrl+Enter triggers reverse (nice for multiline)
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        reverseBtn.click();
      }
    });
  
    // Clear input/output
    clearBtn.addEventListener("click", () => {
      input.value = "";
      result.textContent = "";
      status.textContent = "Cleared.";
      input.focus();
    });
  
    // Copy result
    copyBtn.addEventListener("click", async () => {
      const text = result.textContent || "";
      if (!text) {
        status.textContent = "Nothing to copy.";
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = "Result copied to clipboard.";
      } catch {
        // Fallback: select text and prompt
        const ok = window.prompt("Copy the text below:", text);
        status.textContent = ok !== null ? "Copied (manual)." : "Copy canceled.";
      }
    });
  })();
  