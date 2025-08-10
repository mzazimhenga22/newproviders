import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { getMalIdFromMedia } from '@/utils/mal';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const malId = await getMalIdFromMedia(ctx, ctx.media);

  const query: any = {
    type: ctx.media.type,
    title: ctx.media.title,
    tmdbId: ctx.media.tmdbId,
    imdbId: ctx.media.imdbId,
    malId,
    ...(ctx.media.type === 'show' && {
      season: ctx.media.season.number,
      episode: ctx.media.episode.number,
    }),
    ...(ctx.media.type === 'movie' && { episode: 1 }),
    releaseYear: ctx.media.releaseYear,
  };

  return {
    embeds: [
      {
        embedId: 'zunime-hd-2',
        url: JSON.stringify(query),
      },
      {
        embedId: 'zunime-miko',
        url: JSON.stringify(query),
      },
      {
        embedId: 'zunime-shiro',
        url: JSON.stringify(query),
      },
      {
        embedId: 'zunime-zaza',
        url: JSON.stringify(query),
      },
    ],
  };
}

export const zunimeScraper = makeSourcerer({
  id: 'zunime',
  name: 'Zunime',
  rank: 125,
  flags: [],
  scrapeShow: comboScraper,
});
