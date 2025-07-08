/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const baseUrl = 'https://mia.vidjoy.wtf';

async function comboScraper(ctx: MovieScrapeContext): Promise<SourcererOutput> {
  const apiUrl = `${baseUrl}/movies/${ctx.media.tmdbId}/index.m3u8`;

  const streamRes = await ctx.proxiedFetcher.full(apiUrl, {
    method: 'GET',
    readHeaders: ['content-type'],
    headers: {
      referer: 'https://spencerdevs.xyz/',
      origin: 'https://spencerdevs.xyz',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });

  if (streamRes.statusCode !== 200) throw new NotFoundError('Failed to fetch video source');

  ctx.progress(90);

  return {
    embeds: [],
    stream: [
      {
        id: 'primary',
        type: 'hls',
        playlist: `${baseUrl}/movies/${ctx.media.tmdbId}/index.m3u8`,
        headers: {
          referer: 'https://spencerdevs.xyz/',
          origin: 'https://spencerdevs.xyz',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        flags: [flags.PROXY_BLOCKED],
        captions: [],
      },
    ],
  };
}

export const vidjoyScraper = makeSourcerer({
  id: 'vidjoy',
  name: 'Vidjoy',
  rank: 185,
  flags: [flags.PROXY_BLOCKED],
  scrapeMovie: comboScraper,
});
