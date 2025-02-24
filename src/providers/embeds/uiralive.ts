import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const providers = [
  {
    id: 'uira-slidemovies',
    rank: 320,
  },
  {
    id: 'uira-mega',
    rank: 310,
  },
  {
    id: 'uira-orion',
    rank: 309,
  },
  {
    id: 'uira-rabbit',
    rank: 308,
  },
  {
    id: 'uira-ninja',
    rank: 307,
  },
  {
    id: 'uira-guru',
    rank: 306,
  },
  {
    id: 'uira-vidsrcvip',
    rank: 305,
  },
  {
    id: 'uira-vidapi',
    rank: 304,
  },
  {
    id: 'uira-flixhq',
    rank: 303,
  },
  {
    id: 'uira-ghost',
    rank: 302,
  },
  {
    id: 'uira-hydrax',
    rank: 301,
  },
  {
    id: 'uira-g1',
    rank: 300,
  },
  {
    id: 'uira-g2',
    rank: 299,
  },
  {
    id: 'uira-soapertv',
    rank: 298,
  },
  {
    id: 'uira-flicky',
    rank: 297,
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
  uiraMegaScraper,
  uiraOrionScraper,
  uiraRabbitScraper,
  uiraNinjaScraper,
  uiraGuruScraper,
  uiraVidsrcvipScraper,
  uiraVidapiScraper,
  uiraFlixhqScraper,
  uiraGhostScraper,
  uiraHydraxScraper,
] = providers.map(embed);
