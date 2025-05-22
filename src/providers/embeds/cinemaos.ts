import { flags } from '@/entrypoint/utils/targets';
import { EmbedOutput, makeEmbed } from '@/providers/base';
import { NotFoundError } from '@/utils/errors';

const CINEMAOS_API = 'https://cinemaos-v3.vercel.app/api/neo/backendfetch';

export function makeCinemaOSEmbed(server: string, rank: number) {
  return makeEmbed({
    id: `cinemaos-${server}`,
    name: `CinemaOS: ${server.charAt(0).toUpperCase() + server.slice(1)}`,
    rank,
    async scrape(ctx): Promise<EmbedOutput> {
      const query = JSON.parse(ctx.url);
      const { tmdbId, type, season, episode } = query;
      let url = `${CINEMAOS_API}?requestID=${type === 'show' ? 'tvVideoProvider' : 'movieVideoProvider'}&id=${tmdbId}&service=${server}`;
      if (type === 'show') {
        url += `&season=${season}&episode=${episode}`;
      }
      const res = await ctx.proxiedFetcher(url);
      const data = typeof res === 'string' ? JSON.parse(res) : res;
      const sources = data?.data?.sources;
      if (!sources || !Array.isArray(sources) || sources.length === 0) {
        throw new NotFoundError('No sources found');
      }
      // If only one source, return as a single HLS stream
      if (sources.length === 1) {
        return {
          stream: [
            {
              id: 'primary',
              type: 'hls',
              playlist: sources[0].url,
              flags: [flags.CORS_ALLOWED],
              captions: [],
            },
          ],
        };
      }
      // If multiple sources, treat as file with qualities
      const qualityMap: Record<string, { type: 'mp4'; url: string }> = {};
      for (const src of sources) {
        // Use quality or source as the key, fallback to 'unknown'
        const key = (src.quality || src.source || 'unknown').toString();
        qualityMap[key] = {
          type: 'mp4',
          url: src.url,
        };
      }
      return {
        stream: [
          {
            id: 'primary',
            type: 'file',
            flags: [flags.CORS_ALLOWED],
            qualities: qualityMap,
            captions: [],
          },
        ],
      };
    },
  });
}

// List of supported servers and their ranks (descending order)
const CINEMAOS_SERVERS = [
  'flowcast',
  'shadow',
  'asiacloud',
  'hindicast',
  'anime',
  'animez',
  'guard',
  'hq',
  'ninja',
  'alpha',
  'kaze',
  'zenith',
  'cast',
  'ghost',
  'halo',
  'kinoecho',
  'ee3',
  'volt',
  'putafilme',
  'ophim',
  'kage',
];

// Export all embeds
export const cinemaosEmbeds = CINEMAOS_SERVERS.map((server, i) => makeCinemaOSEmbed(server, 300 - i));
