import { flags } from '@/entrypoint/utils/targets';
import { Sourcerer, SourcererEmbed, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { getMalIdFromMedia } from '@/utils/mal';

export type MalSourceOptions = {
  id: string;
  name: string;
  rank: number;
  embedIds: string[];
  flags?: Array<(typeof flags)[keyof typeof flags]>;
};

export function makeMalSource(opts: MalSourceOptions): Sourcerer {
  async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext) {
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

    const embeds: SourcererEmbed[] = opts.embedIds.map((embedId) => ({
      embedId,
      url: JSON.stringify(query),
    }));

    return { embeds };
  }

  return makeSourcerer({
    id: opts.id,
    name: opts.name,
    rank: opts.rank,
    flags: (opts.flags ?? [flags.CORS_ALLOWED]) as Array<(typeof flags)[keyof typeof flags]>,
    scrapeMovie: comboScraper,
    scrapeShow: comboScraper,
  });
}
