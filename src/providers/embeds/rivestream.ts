/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';
import { findFirstM3U8Url } from '@/utils/m3u8';
import { createM3U8ProxyUrl } from '@/utils/proxy';

import { EmbedOutput, makeEmbed } from '../base';

const baseUrl = 'rivestream.org';
const headers = {
  referer: 'https://rivestream.org/',
  origin: 'https://rivestream.org',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export const rivestreamFlowcastScraper = makeEmbed({
  id: 'rivestream-flowcast',
  name: 'Rivestream Flowcast',
  rank: 424,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=flowcast&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=flowcast&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });
    console.log(res.data.sources);

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamPrimevidsScraper = makeEmbed({
  id: 'rivestream-primevids',
  name: 'Rivestream Primevids',
  rank: 423,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=primevids&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=primevids&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamHumpyScraper = makeEmbed({
  id: 'rivestream-humpy',
  name: 'Rivestream Humpy',
  rank: 422,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=humpy&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=humpy&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamLokiScraper = makeEmbed({
  id: 'rivestream-loki',
  name: 'Rivestream Loki',
  rank: 421,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=loki&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=loki&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamAsiaCloudScraper = makeEmbed({
  id: 'rivestream-asiacloud',
  name: 'Rivestream AsiaCloud',
  rank: 420,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=asiacloud&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=asiacloud&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamShadowScraper = makeEmbed({
  id: 'rivestream-shadow',
  name: 'Rivestream Shadow',
  rank: 419,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=shadow&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=shadow&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamHindicastScraper = makeEmbed({
  id: 'rivestream-hindicast',
  name: 'Rivestream Hindicast',
  rank: 418,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=hindicast&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=hindicast&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamAnimezScraper = makeEmbed({
  id: 'rivestream-animez',
  name: 'Rivestream Animez',
  rank: 417,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=animez&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=animez&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamSapphireScraper = makeEmbed({
  id: 'rivestream-sapphire',
  name: 'Rivestream Sapphire',
  rank: 416,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=sapphire&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=sapphire&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamAquaScraper = makeEmbed({
  id: 'rivestream-aqua',
  name: 'Rivestream Aqua',
  rank: 415,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=aqua&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=aqua&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamGuardScraper = makeEmbed({
  id: 'rivestream-guard',
  name: 'Rivestream Guard',
  rank: 414,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=guard&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=guard&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamCurveScraper = makeEmbed({
  id: 'rivestream-curve',
  name: 'Rivestream Curve',
  rank: 413,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=curve&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=curve&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamHQScraper = makeEmbed({
  id: 'rivestream-hq',
  name: 'Rivestream HQ',
  rank: 412,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=hq&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=hq&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamNinjaScraper = makeEmbed({
  id: 'rivestream-ninja',
  name: 'Rivestream Ninja',
  rank: 411,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=ninja&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=ninja&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamAlphaScraper = makeEmbed({
  id: 'rivestream-alpha',
  name: 'Rivestream Alpha',
  rank: 410,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=alpha&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=alpha&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamKazeScraper = makeEmbed({
  id: 'rivestream-kaze',
  name: 'Rivestream Kaze',
  rank: 409,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=kaze&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=kaze&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamZenesisScraper = makeEmbed({
  id: 'rivestream-zenesis',
  name: 'Rivestream Zenesis',
  rank: 408,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=zenesis&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=zenesis&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamZenithScraper = makeEmbed({
  id: 'rivestream-zenith',
  name: 'Rivestream Zenith',
  rank: 407,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=zenith&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=zenith&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamGhostScraper = makeEmbed({
  id: 'rivestream-ghost',
  name: 'Rivestream Ghost',
  rank: 406,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=ghost&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=ghost&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamKinoEchoScraper = makeEmbed({
  id: 'rivestream-kinoecho',
  name: 'Rivestream KinoEcho',
  rank: 405,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=kinoecho&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=kinoecho&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamEE3Scraper = makeEmbed({
  id: 'rivestream-ee3',
  name: 'Rivestream EE3',
  rank: 404,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=ee3&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=ee3&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamVoltScraper = makeEmbed({
  id: 'rivestream-volt',
  name: 'Rivestream Volt',
  rank: 403,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=volt&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=volt&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamPutafilmeScraper = makeEmbed({
  id: 'rivestream-putafilme',
  name: 'Rivestream Putafilme',
  rank: 402,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=putafilme&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=putafilme&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamOphimScraper = makeEmbed({
  id: 'rivestream-ophim',
  name: 'Rivestream Ophim',
  rank: 401,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=ophim&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=ophim&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const rivestreamKageScraper = makeEmbed({
  id: 'rivestream-kage',
  name: 'Rivestream Kage',
  rank: 400,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=kage&secretKey=NTUyOTk2OGE=&proxyMode=undefined`;
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=kage&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    const playlistUrl = findFirstM3U8Url(res);
    if (!playlistUrl) {
      throw new NotFoundError('No playlist URL found');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(playlistUrl, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});
