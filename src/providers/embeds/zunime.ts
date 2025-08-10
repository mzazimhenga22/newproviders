/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';
// import { createM3U8ProxyUrl } from '@/utils/proxy';

import { EmbedOutput, makeEmbed } from '../base';

const ZUNIME_SERVERS = ['hd-2', 'miko', 'shiro', 'zaza'] as const;

const M3U8_URL_REGEX = /https?:\/\/[^\s"'<>]+?\.m3u8[^\s"'<>]*/i;

function extractFromString(input: string): string | null {
  const match = input.match(M3U8_URL_REGEX);
  return match ? match[0] : null;
}

function findFirstM3U8Url(input: unknown): string | null {
  // eslint-disable-next-line no-console
  console.log(input);
  const visited = new Set<unknown>();

  function dfs(node: unknown): string | null {
    if (node == null) return null;
    if (visited.has(node)) return null;
    if (typeof node === 'object') visited.add(node);

    if (typeof node === 'string') return extractFromString(node);

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

function getFirstM3U8FromSources(sources: any): string | null {
  if (Array.isArray(sources)) {
    for (const source of sources) {
      if (typeof source?.url === 'string' && source.url.includes('.m3u8')) {
        return source.url;
      }
    }
    return null;
  }
  if (typeof sources?.url === 'string' && sources.url.includes('.m3u8')) {
    return sources.url;
  }
  return null;
}

const baseUrl = 'https://backend.xaiby.sbs';
const headers = {
  referer: 'https://vidnest.fun/',
  origin: 'https://vidnest.fun',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export function makeZunimeEmbed(id: string, rank: number = 100) {
  return makeEmbed({
    id: `zunime-${id}`,
    name: `Zunime ${id.charAt(0).toUpperCase() + id.slice(1)}`,
    rank,
    async scrape(ctx): Promise<EmbedOutput> {
      const serverName = id as (typeof ZUNIME_SERVERS)[number];

      const query = JSON.parse(ctx.url);
      const { type, malId, episode } = query;

      if (type !== 'movie' && type !== 'show') throw new NotFoundError('Unsupported media type');

      const res = await ctx.proxiedFetcher(`${'/sources'}`, {
        baseUrl,
        headers,
        query: {
          id: String(malId),
          ep: String(episode ?? 1),
          host: serverName,
          type: 'dub',
        },
      });

      console.log('Zunime API Response:', JSON.stringify(res, null, 2));
      const resAny: any = res as any;

      const playlistUrl: string | null =
        getFirstM3U8FromSources(resAny?.sources) ??
        (typeof resAny?.url === 'string' && resAny.url.includes('.m3u8') ? resAny.url : null) ??
        findFirstM3U8Url(resAny);

      console.log('Extracted playlistUrl:', playlistUrl); // silly debugging heheh

      const upstreamHeaders: Record<string, string> =
        resAny?.sources?.headers && Object.keys(resAny.sources.headers).length > 0 ? resAny.sources.headers : headers;

      if (!playlistUrl) throw new NotFoundError('No playlist URL found');

      ctx.progress(100);

      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: `https://proxy-2.madaraverse.online/proxy?url=${encodeURIComponent(playlistUrl)}`,
            headers: upstreamHeaders,
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  });
}

export const zunimeEmbeds = ZUNIME_SERVERS.map((server, i) => makeZunimeEmbed(server, 260 - i));
