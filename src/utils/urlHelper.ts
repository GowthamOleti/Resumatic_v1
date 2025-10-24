/**
 * Ensures a URL has a proper protocol (https://)
 * @param url - The URL to format
 * @returns The URL with protocol, or the original URL if already has one
 */
export function ensureProtocol(url: string): string {
  if (!url) return '';
  
  // If URL already has a protocol, return as is
  if (url.match(/^https?:\/\//i)) {
    return url;
  }
  
  // Add https:// prefix
  return `https://${url}`;
}

