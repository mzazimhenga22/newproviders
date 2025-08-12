/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';
import { createM3U8ProxyUrl } from '@/utils/proxy';

import { EmbedOutput, makeEmbed } from '../base';

const VIDIFY_SERVERS = ['alfa', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett'];

const baseUrl = 'api.vidify.top';
const headers = {
  referer: 'https://player.vidify.top/',
  origin: 'https://player.vidify.top',
  Authorization: 'Bearer qwertwertrewfrgthhewghtrjrgrthrdrgtryhtew',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export function makeVidifyEmbed(id: string, rank: number = 100) {
  const serverIndex = VIDIFY_SERVERS.indexOf(id) + 1;

  return makeEmbed({
    id: `vidify-${id}`,
    name: `Vidify ${id.charAt(0).toUpperCase() + id.slice(1)}`,
    rank,
    async scrape(ctx): Promise<EmbedOutput> {
      const query = JSON.parse(ctx.url);
      const { type, tmdbId, season, episode } = query;

      let url = `https://${baseUrl}/`;

      if (type === 'movie') {
        url += `/movie/${tmdbId}?sr=${serverIndex}`;
      } else if (type === 'show') {
        url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=${serverIndex}`;
      } else {
        throw new NotFoundError('Unsupported media type');
      }

      const res = await ctx.proxiedFetcher(url, { headers });
      console.log(res);

      const playlistUrl = res.m3u8;

      if (playlistUrl) {
        if (playlistUrl.includes('https://live.adultiptv.net/rough.m3u8')) {
          throw new NotFoundError('No playlist URL found');
        }
      }
      if (!playlistUrl) {
        throw new NotFoundError('No playlist URL found');
      }

      // use host if needed :YURRR:
      const streamHeaders: Record<string, string> = { ...headers };

      // add the host header if bro uses his proxy
      if (playlistUrl.includes('proxyv1.vidify.top')) {
        streamHeaders.Host = 'proxyv1.vidify.top';
      } else if (playlistUrl.includes('proxyv2.vidify.top')) {
        streamHeaders.Host = 'proxyv2.vidify.top';
      }

      ctx.progress(100);

      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: createM3U8ProxyUrl(playlistUrl, streamHeaders),
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  });
}

export const vidifyEmbeds = VIDIFY_SERVERS.map((server, i) => makeVidifyEmbed(server, 230 - i));
