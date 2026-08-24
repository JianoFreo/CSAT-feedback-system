// src/utils/sanitize.ts
import sanitizeHtml from "sanitize-html";

// Strips all tags/attributes. React escapes on render either way, but we
// don't want raw HTML sitting in the database at all (e.g. for CSV exports,
// admin tooling, or any future view that renders feedback as HTML).
export function stripHtml(input: string): string {
  return sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
}
