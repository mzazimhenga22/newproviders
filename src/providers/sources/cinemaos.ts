import { flags } from '@/entrypoint/utils/targets';
import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';

const CINEMAOS_SERVERS = [
  //   'flowcast',
  'shadow',
  'asiacloud',
  //   'hindicast',
  //   'anime',
  //   'animez',
  //   'guard',
  //   'hq',
  //   'ninja',
  //   'alpha',
  //   'kaze',
  //   'zenith',
  'cast',
  //   'ghost',
  'halo',
  'kinoecho',
  //   'ee3',
  'volt',
  //   'putafilme',
  'ophim',
  //   'kage',
];

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const res = await ctx.proxiedFetcher(
    'https://cinemaos-v3.vercel.app/api/neo/backendfetch?requestID=VideoProviderServices',
  );
  let availableServers = [];
  try {
    const data = typeof res === 'string' ? JSON.parse(res) : res;
    availableServers = Array.isArray(data?.data) ? data.data : [];
  } catch (e) {
    availableServers = [];
  }

  const filteredServers = availableServers.filter((server: string) => CINEMAOS_SERVERS.includes(server));

  const query: any = {
    type: ctx.media.type,
    tmdbId: ctx.media.tmdbId,
  };

  if (ctx.media.type === 'show') {
    query.season = ctx.media.season.number;
    query.episode = ctx.media.episode.number;
  }

  const embeds = filteredServers.map((server: string) => ({
    embedId: `cinemaos-${server}`,
    url: JSON.stringify({ ...query, service: server }),
  }));

  // eslint-disable-next-line no-console
  console.log(embeds);

  return { embeds };
}

export const cinemaosScraper = makeSourcerer({
  id: 'cinemaos',
  name: 'CinemaOS',
  rank: 230,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
