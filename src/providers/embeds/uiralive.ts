import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const providers = [
  {
    id: 'uira-slidemovies',
    rank: 314,
  },
  {
    id: 'uira-mega',
    rank: 313,
  },
  {
    id: 'uira-shadow',
    rank: 312,
  },
  {
    id: 'uira-orion',
    rank: 311,
  },
  {
    id: 'uira-rabbit',
    rank: 310,
  },
  {
    id: 'uira-ninja',
    rank: 309,
  },
  {
    id: 'uira-ninja1',
    rank: 308,
  },
  {
    id: 'uira-guru',
    rank: 307,
  },
  {
    id: 'uira-fastx',
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
  uiraSlidemoviesScraper,
  uiraMegaScraper,
  uiraShadowScraper,
  uiraOrionScraper,
  uiraRabbitScraper,
  uiraNinjaScraper,
  uiraNinja1Scraper,
  uiraGuruScraper,
  uiraFastxScraper,
  uiraVidsrcvipScraper,
  uiraVidapiScraper,
  uiraFlixhqScraper,
  uiraGhostScraper,
  uiraHydraxScraper,
  uiraG1Scraper,
  uiraG2Scraper,
  uiraSoapertvScraper,
] = providers.map(embed);
