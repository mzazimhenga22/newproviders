import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const embedPage = await ctx.proxiedFetcher(
    `https://vidsrc.su/embed/${ctx.media.type === 'movie' ? `movie/${ctx.media.tmdbId}` : `tv/${ctx.media.tmdbId}/${ctx.media.season.number}/${ctx.media.episode.number}`}`,
  );
  const serverMatches = [...embedPage.matchAll(/label: 'Server (\d+)', url: '(https.*)'/g)];

  const servers = serverMatches.map((match) => ({
    serverNumber: parseInt(match[1], 10),
    url: match[2],
  }));
  ctx.progress(60);

  if (!servers.length) throw new NotFoundError('No server playlist found');

  const embeds: SourcererEmbed[] = servers.map((server) => ({
    embedId: `server-${server.serverNumber}`,
    url: server.url,
  }));
  ctx.progress(90);

  return {
    embeds,
  };
}
export const vidsrcsuScraper = makeSourcerer({
  id: 'vidsrcsu',
  name: 'vidsrc.su (FlixHQ)',
  rank: 145,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});

// Just to get the flixhq playlist (Server 1, 2, and 3)

// async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
//   const embedPage = await ctx.proxiedFetcher(
//     `https://vidsrc.su/embed/${ctx.media.type === 'movie' ? `movie/${ctx.media.tmdbId}` : `tv/${ctx.media.tmdbId}/${ctx.media.season.number}/${ctx.media.episode.number}`}`,
//   );

//   const servers = [...embedPage.matchAll(/label: 'Server (1|2|3)', url: '(https.*)'/g)] // only server 1,2 and 3 are flixhq
//     .sort((a, b) => {
//       // ranking for servers
//       const ranks: Record<string, number> = { '1': 10, '2': 30, '3': 20 }; // server 2 > 3 > 1
//       return ranks[b[1]] - ranks[a[1]];
//     })
//     .map((x) => x[2]);

//   if (!servers[0]) throw new NotFoundError('No flixhq playlist found');
//   ctx.progress(60);

// return {
//   embeds: [],
//   stream: [
//     {
//       id: 'primary',
//       playlist: servers[0],
//       type: 'hls',
//       flags: [flags.CORS_ALLOWED],
//       captions: [],
//   })),
// };
