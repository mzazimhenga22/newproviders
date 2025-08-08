/**
 * Utilities for extracting HLS playlist URLs from arbitrary data structures.
 */

const M3U8_URL_REGEX = /https?:\/\/[^\s"'<>]+?\.m3u8[^\s"'<>]*/i;

function extractFromString(input: string): string | null {
  const match = input.match(M3U8_URL_REGEX);
  return match ? match[0] : null;
}

export function findFirstM3U8Url(input: unknown): string | null {
  // eslint-disable-next-line no-console
  console.log(input);
  const visited = new Set<unknown>();

  function dfs(node: unknown): string | null {
    if (node == null) return null;
    if (visited.has(node)) return null;
    // Only mark objects/arrays as visited to avoid blocking primitives
    if (typeof node === 'object') visited.add(node);

    if (typeof node === 'string') {
      return extractFromString(node);
    }

    if (Array.isArray(node)) {
      for (const element of node) {
        const found = dfs(element);
        if (found) return found;
      }
      return null;
    }

    if (typeof node === 'object') {
      for (const value of Object.values(node as Record<string, unknown>)) {
        if (typeof value === 'string') {
          const foundInString = extractFromString(value);
          if (foundInString) return foundInString;
        } else {
          const found = dfs(value);
          if (found) return found;
        }
      }
    }

    return null;
  }

  return dfs(input);
}
