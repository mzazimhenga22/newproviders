import { SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const query = {
    type: ctx.media.type,
    title: ctx.media.title,
    tmdbId: ctx.media.tmdbId,
    imdbId: ctx.media.imdbId,
    ...(ctx.media.type === 'show' && {
      season: ctx.media.season.number,
      episode: ctx.media.episode.number,
    }),
    releaseYear: ctx.media.releaseYear,
  };

  return {
    embeds: [
      {
        embedId: 'rivestream-flowcast',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-humpy',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-loki',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-asiacloud',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-shadow',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-hindicast',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-animez',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-sapphire',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-aqua',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-guard',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-curve',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-hq',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-ninja',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-alpha',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-kaze',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-zenesis',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-zenith',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-ghost',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-kinoecho',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-ee3',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-volt',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-putafilme',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-ophim',
        url: JSON.stringify(query),
      },
      {
        embedId: 'rivestream-kage',
        url: JSON.stringify(query),
      },
    ],
  };
}

export const rivestreamScraper = makeSourcerer({
  id: 'rivestream',
  name: 'Rivestream',
  rank: 134,
  disabled: false,
  flags: [],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
