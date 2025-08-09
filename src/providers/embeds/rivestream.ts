/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';
import { findFirstM3U8Url } from '@/utils/m3u8';
import { createM3U8ProxyUrl } from '@/utils/proxy';

import { EmbedOutput, makeEmbed } from '../base'; // the ranks need changing :thumbsup:

const baseUrl = 'rivestream.org';
const headers = {
  referer: 'https://rivestream.org/',
  origin: 'https://rivestream.org',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export const rivestreamFlowcastEmbed = makeEmbed({
  id: 'rivestream-flowcast',
  name: 'Rivestream Flowcast',
  rank: 230,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/api/backendfetch?requestID=movieVideoProvider&id=${tmdbId}&service=flowcast&secretKey=NTUyOTk2OGE=&proxyMode=undefined`; ${tmdbId} ${season} ${episode}
    } else if (type === 'show') {
      url += `/api/backendfetch?requestID=tvVideoProvider&id=${tmdbId}&season=${season}&episode=${episode}&service=flowcast&secretKey=M2IyYWEwMzU=&proxyMode=undefined`;
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

export const rivestreamPrimevidsEmbed = makeEmbed({
  id: 'rivestream-primevids',
  name: 'Rivestream Primevids',
  rank: 240,
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

export const rivestreamHumpyEmbed = makeEmbed({
  id: 'rivestream-humpy',
  name: 'Rivestream Humpy',
  rank: 250,
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

export const rivestreamLokiEmbed = makeEmbed({
  id: 'rivestream-loki',
  name: 'Rivestream Loki',
  rank: 260,
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

export const rivestreamAsiaCloudEmbed = makeEmbed({
  id: 'rivestream-asiacloud',
  name: 'Rivestream AsiaCloud',
  rank: 270,
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

export const rivestreamShadowEmbed = makeEmbed({
  id: 'rivestream-shadow',
  name: 'Rivestream Shadow',
  rank: 280,
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

export const rivestreamHindicastEmbed = makeEmbed({
  id: 'rivestream-hindicast',
  name: 'Rivestream Hindicast',
  rank: 290,
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

export const rivestreamAnimezEmbed = makeEmbed({
  id: 'rivestream-animez',
  name: 'Rivestream Animez',
  rank: 300,
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

export const rivestreamSapphireEmbed = makeEmbed({
  id: 'rivestream-sapphire',
  name: 'Rivestream Sapphire',
  rank: 310,
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

export const rivestreamAquaEmbed = makeEmbed({
  id: 'rivestream-aqua',
  name: 'Rivestream Aqua',
  rank: 320,
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

export const rivestreamGuardEmbed = makeEmbed({
  id: 'rivestream-guard',
  name: 'Rivestream Guard',
  rank: 330,
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

export const rivestreamCurveEmbed = makeEmbed({
  id: 'rivestream-curve',
  name: 'Rivestream Curve',
  rank: 340,
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

export const rivestreamHQEmbed = makeEmbed({
  id: 'rivestream-hq',
  name: 'Rivestream HQ',
  rank: 350,
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

export const rivestreamNinjaEmbed = makeEmbed({
  id: 'rivestream-ninja',
  name: 'Rivestream Ninja',
  rank: 360,
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

export const rivestreamAlphaEmbed = makeEmbed({
  id: 'rivestream-alpha',
  name: 'Rivestream Alpha',
  rank: 370,
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

export const rivestreamKazeEmbed = makeEmbed({
  id: 'rivestream-kaze',
  name: 'Rivestream Kaze',
  rank: 380,
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

export const rivestreamZenesisEmbed = makeEmbed({
  id: 'rivestream-zenesis',
  name: 'Rivestream Zenesis',
  rank: 390,
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

export const rivestreamZenithEmbed = makeEmbed({
  id: 'rivestream-zenith',
  name: 'Rivestream Zenith',
  rank: 400,
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

export const rivestreamGhostEmbed = makeEmbed({
  id: 'rivestream-ghost',
  name: 'Rivestream Ghost',
  rank: 410,
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

export const rivestreamKinoEchoEmbed = makeEmbed({
  id: 'rivestream-kinoecho',
  name: 'Rivestream KinoEcho',
  rank: 420,
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

export const rivestreamEE3Embed = makeEmbed({
  id: 'rivestream-ee3',
  name: 'Rivestream EE3',
  rank: 430,
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

export const rivestreamVoltEmbed = makeEmbed({
  id: 'rivestream-volt',
  name: 'Rivestream Volt',
  rank: 440,
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


export const rivestreamPutafilmeEmbed = makeEmbed({
  id: 'rivestream-putafilme',
  name: 'Rivestream Putafilme',
  rank: 460,
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


export const rivestreamOphimEmbed = makeEmbed({
  id: 'rivestream-ophim',
  name: 'Rivestream Ophim',
  rank: 450,
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

export const rivestreamKageEmbed = makeEmbed({
  id: 'rivestream-kage',
  name: 'Rivestream Kage',
  rank: 460,
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




