/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';
import { createM3U8ProxyUrl } from '@/utils/proxy';

import { EmbedOutput, makeEmbed } from '../base';
import { labelToLanguageCode } from '../captions';

const baseUrl = 'rivestream.org';
const headers = {
  referer: 'https://rivestream.org/',
  origin: 'https://rivestream.org',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export function makeRivestreamEmbed(id: string, rank: number = 100) {
  return makeEmbed({
    id: `rivestream-${id}`,
    name: `Rivestream ${id.charAt(0).toUpperCase() + id.slice(1)}`,
    rank,
    async scrape(ctx): Promise<EmbedOutput> {
      const query = JSON.parse(ctx.url);
      const { type, tmdbId, season, episode } = query;

      let url = `https://${baseUrl}/`;

      if (type === 'movie') {
        url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=${id}&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
      } else if (type === 'show') {
        url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=${id}&secretKey=LTJhM2VlMDkz&proxyMode=undefined`;
      } else {
        throw new NotFoundError('Unsupported media type');
      }

      const res = await ctx.proxiedFetcher(url, { headers });
      console.log('res:', JSON.stringify(res, null, 2));

      if (!res.data || !res.data.sources || !Array.isArray(res.data.sources)) {
        throw new NotFoundError('No sources found');
      }

      ctx.progress(50);

      const captions =
        res.data.captions?.map((caption: any) => ({
          id: caption.label || 'default',
          url: caption.file,
          type: 'srt',
          language: labelToLanguageCode(caption.label),
        })) || [];

      const firstSource = res.data.sources[0];
      if (!firstSource) {
        throw new NotFoundError('No sources available');
      }

      if (firstSource.format === 'mp4') {
        const qualities: Record<string, any> = {};

        for (const source of res.data.sources) {
          const quality = source.quality;
          if (quality && source.url) {
            if (quality === 2160 || quality === '4K') {
              qualities['4k'] = {
                type: 'mp4',
                url: source.url,
              };
            } else if (quality === 1080) {
              qualities[1080] = {
                type: 'mp4',
                url: source.url,
              };
            } else if (quality === 720) {
              qualities[720] = {
                type: 'mp4',
                url: source.url,
              };
            } else if (quality === 480) {
              qualities[480] = {
                type: 'mp4',
                url: source.url,
              };
            } else if (quality === 360) {
              qualities[360] = {
                type: 'mp4',
                url: source.url,
              };
            } else {
              // For any other quality, add as unknown
              qualities.unknown = {
                type: 'mp4',
                url: source.url,
              };
            }
          }
        }

        console.log('qualities:', qualities);

        ctx.progress(90);
        return {
          stream: [
            {
              id: 'primary',
              type: 'file',
              qualities,
              flags: [flags.CORS_ALLOWED],
              captions,
            },
          ],
        };
      }

      ctx.progress(90);
      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: createM3U8ProxyUrl(firstSource.url, headers),
            flags: [flags.CORS_ALLOWED],
            captions,
          },
        ],
      };
    },
  });
}

const RIVESTREAM_SERVERS = [
  'flowcast',
  'humpy',
  'loki',
  'asiacloud',
  'shadow',
  'hindicast',
  'animez',
  'sapphire',
  'aqua',
  'guard',
  'curve',
  'hq',
  'ninja',
  'alpha',
  'kaze',
  'zenesis',
  'zenith',
  'ghost',
  'kinoecho',
  'ee3',
  'volt',
  'putafilme',
  'ophim',
  'kage',
];

export const rivestreamEmbeds = RIVESTREAM_SERVERS.map((server, i) => makeRivestreamEmbed(server, 400 - i));
