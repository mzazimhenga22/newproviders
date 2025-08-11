/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';

import { EmbedOutput, makeEmbed } from '../base';

const ANIMETSU_SERVERS = ['pahe', 'zoro', 'zaza', 'meg', 'bato'] as const;

function getFirstStreamUrlFromSources(sources: any): string | null {
  if (Array.isArray(sources)) {
    for (const source of sources) {
      if (typeof source?.url === 'string') {
        return source.url;
      }
    }
    return null;
  }
  if (typeof sources?.url === 'string') {
    return sources.url;
  }
  return null;
}

function findFirstM3U8Url(input: unknown): string | null {
  const visited = new Set<unknown>();

  function dfs(node: unknown): string | null {
    if (node == null) return null;
    if (visited.has(node)) return null;
    if (typeof node === 'object') visited.add(node);

    if (typeof node === 'string' && node.includes('http')) return node;

    if (Array.isArray(node)) {
      for (const element of node) {
        const found = dfs(element);
        if (found) return found;
      }
      return null;
    }

    if (typeof node === 'object') {
      for (const value of Object.values(node as Record<string, unknown>)) {
        const found = dfs(value);
        if (found) return found;
      }
    }
    return null;
  }

  return dfs(input);
}

const baseUrl = 'https://backend.animetsu.to';
const headers = {
  referer: 'https://animetsu.to/',
  origin: 'https://backend.animetsu.to',
  accept: 'application/json, text/plain, */*',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

async function resolveTiddiesUrl(
  ctx: { proxiedFetcher: (url: string, options?: any) => Promise<any> },
  url: string,
  extraHeaders: Record<string, string>,
) {
  const jsonRes = await ctx.proxiedFetcher(url, {
    headers: {
      ...headers,
      ...extraHeaders,
    },
  });

  if (typeof jsonRes?.url === 'string') return jsonRes.url;
  if (typeof jsonRes === 'string' && jsonRes.includes('m3u8')) return jsonRes;

  throw new NotFoundError('Could not resolve tiddies link');
}

export function makeAnimetsuEmbed(id: string, rank: number = 100) {
  return makeEmbed({
    id: `animetsu-${id}`,
    name: `Animetsu ${id.charAt(0).toUpperCase() + id.slice(1)}`,
    rank,
    async scrape(ctx): Promise<EmbedOutput> {
      const serverName = id as (typeof ANIMETSU_SERVERS)[number];

      const query = JSON.parse(ctx.url);
      const { type, malId, episode } = query;

      if (type !== 'movie' && type !== 'show') {
        throw new NotFoundError('Unsupported media type');
      }

      const res = await ctx.proxiedFetcher(`/api/anime/tiddies`, {
        baseUrl,
        headers,
        query: {
          server: serverName,
          id: String(malId),
          num: String(episode ?? 1),
          subType: 'dub',
        },
      });

      console.log('Animetsu API Response:', JSON.stringify(res, null, 2));

      const resAny: any = res as any;

      let playlistUrl: string | null =
        getFirstStreamUrlFromSources(resAny?.sources) ??
        (typeof resAny?.url === 'string' ? resAny.url : null) ??
        findFirstM3U8Url(resAny);

      console.log('Extracted playlistUrl:', playlistUrl);

      if (!playlistUrl) throw new NotFoundError('No playlist URL found');

      if (playlistUrl.includes('tiddies.animetsu.to')) {
        playlistUrl = await resolveTiddiesUrl(ctx, playlistUrl, resAny?.sources?.headers ?? {});
      }

      if (!playlistUrl) throw new NotFoundError('No playlist URL found after resolving tiddies');

      let streamHeaders = { ...headers };

      // change headers if the url has backend.animetsu.cc bc they tried to make it harder
      if (playlistUrl.includes('backend.animetsu.cc')) {
        const { referer, origin, ...restHeaders } = streamHeaders;

        streamHeaders = {
          ...restHeaders,
          Host: 'backend.animetsu.cc',
          Origin: 'https://backend.animetsu.cc',
          Referer: 'https://backend.animetsu.cc',
        };
      }

      ctx.progress(100);

      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: playlistUrl,
            headers: streamHeaders,
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  });
}

export const AnimetsuEmbeds = ANIMETSU_SERVERS.map((server, i) => makeAnimetsuEmbed(server, 300 - i));
