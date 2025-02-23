import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

const baseUrl = 'https://xj4h5qk3tf7v2mlr9s.uira.live/';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const result = await ctx.fetcher(
    `${baseUrl}all/${ctx.media.tmdbId}${
      ctx.media.type === 'movie' ? '' : `?s=${ctx.media.season.number}&e=${ctx.media.episode.number}`
    }`,
  );

  if (!result?.sources?.length) {
    throw new NotFoundError('No sources found');
  }

  const embeds: SourcererEmbed[] = result.sources.map((source: { source: any; url: any }) => ({
    embedId: `uira-${source.source}`,
    url: source.url,
  }));

  ctx.progress(90);

  return {
    embeds,
  };
}

export const uiraliveScraper = makeSourcerer({
  id: 'uiralive',
  name: 'uira.live',
  rank: 155,
  disabled: false,
  flags: [flags.CORS_ALLOWED],
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
