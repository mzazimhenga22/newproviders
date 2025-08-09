/* eslint-disable no-console */
import { flags } from '@/entrypoint/utils/targets';
import { NotFoundError } from '@/utils/errors';
import { findFirstM3U8Url } from '@/utils/m3u8';
import { createM3U8ProxyUrl } from '@/utils/proxy';

import { EmbedOutput, makeEmbed } from '../base';

const baseUrl = 'api.vidify.top';
const headers = {
  referer: 'https://player.vidify.top/',
  origin: 'https://player.vidify.top',
  Authorization: 'Bearer scraper_ki_ma_ka_server',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

export const vidifyAlfaEmbed = makeEmbed({
  id: 'vidify-alfa',
  name: 'Vidify Alfa',
  rank: 230,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=1`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=1`;
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

export const vidifyBravoEmbed = makeEmbed({
  id: 'vidify-bravo',
  name: 'Vidify Bravo',
  rank: 229,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=2`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=2`;
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

export const vidifyCharlieEmbed = makeEmbed({
  id: 'vidify-charlie',
  name: 'Vidify Charlie',
  rank: 228,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=3`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=3`;
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

export const vidifyDeltaEmbed = makeEmbed({
  id: 'vidify-delta',
  name: 'Vidify Delta',
  rank: 227,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=4`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=4`;
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

export const vidifyEchoEmbed = makeEmbed({
  id: 'vidify-echo',
  name: 'Vidify Echo',
  rank: 226,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=5`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=5`;
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

export const vidifyFoxtrotEmbed = makeEmbed({
  id: 'vidify-foxtrot',
  name: 'Vidify Foxtrot',
  rank: 225,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=6`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=6`;
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

export const vidifyGolfEmbed = makeEmbed({
  id: 'vidify-golf',
  name: 'Vidify Golf',
  rank: 224,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=7`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=7`;
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

export const vidifyHotelEmbed = makeEmbed({
  id: 'vidify-hotel',
  name: 'Vidify Hotel',
  rank: 223,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=8`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=8`;
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

export const vidifyIndiaEmbed = makeEmbed({
  id: 'vidify-india',
  name: 'Vidify India',
  rank: 222,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=9`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=9`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    if (!Array.isArray(res) || res.length === 0) {
      throw new NotFoundError('No streams found');
    }
    const stream = res[0];

    if (!stream.file) {
      throw new NotFoundError('No file URL found in stream');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(stream.file, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});

export const vidifyJuliettEmbed = makeEmbed({
  id: 'vidify-juliett',
  name: 'Vidify Juliett',
  rank: 221,
  async scrape(ctx): Promise<EmbedOutput> {
    const query = JSON.parse(ctx.url);
    const { type, tmdbId, season, episode } = query;

    let url = `https://${baseUrl}/`;

    if (type === 'movie') {
      url += `/movie/${tmdbId}?sr=10`;
    } else if (type === 'show') {
      url += `/tv/${tmdbId}/season/${season}/episode/${episode}?sr=10`;
    } else {
      throw new NotFoundError('Unsupported media type');
    }

    const res = await ctx.proxiedFetcher(url, { headers });

    if (!Array.isArray(res) || res.length === 0) {
      throw new NotFoundError('No streams found');
    }
    const stream = res[0];

    if (!stream.file) {
      throw new NotFoundError('No file URL found in stream');
    }

    ctx.progress(100);

    return {
      stream: [
        {
          id: 'primary',
          type: 'hls',
          playlist: createM3U8ProxyUrl(stream.file, headers),
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});
