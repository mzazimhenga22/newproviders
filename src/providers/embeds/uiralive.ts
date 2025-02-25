import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const providers = [
  {
    id: 'uira-catflix',
    rank: 309,
  },
  {
    id: 'uira-mega',
    rank: 308,
  },
  {
    id: 'uira-rabbit',
    rank: 307,
  },
  {
    id: 'uira-orion',
    rank: 306,
  },
  {
    id: 'uira-vidsrcvip',
    rank: 305,
  },
  {
    id: 'uira-flixhq',
    rank: 304,
  },
  {
    id: 'uira-slidemovies',
    rank: 303,
  },
  {
    id: 'uira-vidapi',
    rank: 302,
  },
  {
    id: 'uira-flicky',
    rank: 301,
  },
];

function embed(provider: { id: string; rank: number; name?: string; disabled?: boolean }) {
  return makeEmbed({
    id: provider.id,
    name:
      provider.name ||
      provider.id
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' '),
    disabled: provider.disabled,
    rank: provider.rank,
    async scrape(ctx) {
      return {
        stream: [
          {
            id: 'primary',
            type: 'hls',
            playlist: ctx.url,
            flags: [flags.CORS_ALLOWED],
            captions: [],
          },
        ],
      };
    },
  });
}

export const [
  uiraCatflixScraper,
  uiraMegaScraper,
  uiraRabbitScraper,
  uiraOrionScraper,
  uiraVidsrcvipScraper,
  uiraFlixhqScraper,
  uiraSlidemoviesScraper,
  uiraVidapiScraper,
  uiraFlickyScraper,
] = providers.map(embed);
