/**
 * Ensures an image alt text is never empty.
 * If no alt is provided, generates a reasonable fallback.
 * 
 * @param alt - The provided alt text
 * @param fallback - Optional fallback text (e.g., page title or image filename)
 * @returns A non-empty alt string
 */
export function ensureAlt(
  alt: string | null | undefined,
  fallback?: string
): string {
  const trimmed = alt?.trim();
  if (trimmed) return trimmed;
  
  if (fallback?.trim()) {
    return fallback.trim();
  }
  
  return "Quilliams Gardening & Landscaping";
}

/**
 * Extracts a reasonable alt text from an image path/filename.
 * 
 * @param src - The image source path
 * @returns A human-readable alt text
 */
export function altFromPath(src: string): string {
  // Get filename without extension
  const filename = src.split("/").pop()?.split(".")[0] ?? "";
  
  // Replace common separators with spaces
  const readable = filename
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase to spaces
    .toLowerCase();
  
  // Capitalize first letter
  return readable.charAt(0).toUpperCase() + readable.slice(1);
}
