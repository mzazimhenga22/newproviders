import { Embed, Sourcerer } from '@/providers/base';
import { doodScraper } from '@/providers/embeds/dood';
import { mixdropScraper } from '@/providers/embeds/mixdrop';
import { turbovidScraper } from '@/providers/embeds/turbovid';
import { upcloudScraper } from '@/providers/embeds/upcloud';
import { autoembedScraper } from '@/providers/sources/autoembed';
import { catflixScraper } from '@/providers/sources/catflix';
import { ee3Scraper } from '@/providers/sources/ee3';
import { fsharetvScraper } from '@/providers/sources/fsharetv';
import { insertunitScraper } from '@/providers/sources/insertunit';
import { mp4hydraScraper } from '@/providers/sources/mp4hydra';
import { tugaflixScraper } from '@/providers/sources/tugaflix';
import { vidsrcScraper } from '@/providers/sources/vidsrc';
import { vidsrcsuScraper } from '@/providers/sources/vidsrcsu';

import {
  autoembedBengaliScraper,
  autoembedEnglishScraper,
  autoembedHindiScraper,
  autoembedTamilScraper,
  autoembedTeluguScraper,
} from './embeds/autoembed';
import { cinemaosEmbeds } from './embeds/cinemaos';
import { closeLoadScraper } from './embeds/closeload';
import { mp4hydraServer1Scraper, mp4hydraServer2Scraper } from './embeds/mp4hydra';
import { ridooScraper } from './embeds/ridoo';
import { streamtapeLatinoScraper, streamtapeScraper } from './embeds/streamtape';
import { streamvidScraper } from './embeds/streamvid';
import {
  streamwishEnglishScraper,
  streamwishJapaneseScraper,
  streamwishLatinoScraper,
  streamwishSpanishScraper,
} from './embeds/streamwish';
import { vidCloudScraper } from './embeds/vidcloud';
import {
  VidsrcsuServer10Scraper,
  VidsrcsuServer11Scraper,
  VidsrcsuServer12Scraper,
  VidsrcsuServer1Scraper,
  VidsrcsuServer20Scraper,
  VidsrcsuServer2Scraper,
  VidsrcsuServer3Scraper,
  VidsrcsuServer4Scraper,
  VidsrcsuServer5Scraper,
  VidsrcsuServer6Scraper,
  VidsrcsuServer7Scraper,
  VidsrcsuServer8Scraper,
  VidsrcsuServer9Scraper,
} from './embeds/vidsrcsu';
import { viperScraper } from './embeds/viper';
import { warezcdnembedHlsScraper } from './embeds/warezcdn/hls';
import { warezcdnembedMp4Scraper } from './embeds/warezcdn/mp4';
import { warezPlayerScraper } from './embeds/warezcdn/warezplayer';
import { EightStreamScraper } from './sources/8stream';
import { animeflvScraper } from './sources/animeflv';
import { cinemaosScraper } from './sources/cinemaos';
import { coitusScraper } from './sources/coitus';
import { cuevana3Scraper } from './sources/cuevana3';
import { embedsuScraper } from './sources/embedsu';
import { hdRezkaScraper } from './sources/hdrezka';
import { iosmirrorScraper } from './sources/iosmirror';
import { iosmirrorPVScraper } from './sources/iosmirrorpv';
import { nunflixScraper } from './sources/nunflix';
import { ridooMoviesScraper } from './sources/ridomovies';
import { slidemoviesScraper } from './sources/slidemovies';
import { soaperTvScraper } from './sources/soapertv';
import { streamboxScraper } from './sources/streambox';
import { vidapiClickScraper } from './sources/vidapiclick';
import { vidjoyScraper } from './sources/vidjoy';
import { warezcdnScraper } from './sources/warezcdn';
import { wecimaScraper } from './sources/wecima';

export function gatherAllSources(): Array<Sourcerer> {
  // all sources are gathered here
  return [
    cuevana3Scraper,
    catflixScraper,
    ridooMoviesScraper,
    hdRezkaScraper,
    warezcdnScraper,
    insertunitScraper,
    soaperTvScraper,
    autoembedScraper,
    tugaflixScraper,
    ee3Scraper,
    fsharetvScraper,
    vidsrcsuScraper,
    vidsrcScraper,
    mp4hydraScraper,
    embedsuScraper,
    slidemoviesScraper,
    iosmirrorScraper,
    iosmirrorPVScraper,
    vidapiClickScraper,
    coitusScraper,
    streamboxScraper,
    nunflixScraper,
    EightStreamScraper,
    wecimaScraper,
    animeflvScraper,
    cinemaosScraper,
    vidjoyScraper,
  ];
}

export function gatherAllEmbeds(): Array<Embed> {
  // all embeds are gathered here
  return [
    upcloudScraper,
    vidCloudScraper,
    mixdropScraper,
    ridooScraper,
    closeLoadScraper,
    doodScraper,
    streamvidScraper,
    streamtapeScraper,
    warezcdnembedHlsScraper,
    warezcdnembedMp4Scraper,
    warezPlayerScraper,
    autoembedEnglishScraper,
    autoembedHindiScraper,
    autoembedBengaliScraper,
    autoembedTamilScraper,
    autoembedTeluguScraper,
    turbovidScraper,
    mp4hydraServer1Scraper,
    mp4hydraServer2Scraper,
    VidsrcsuServer1Scraper,
    VidsrcsuServer2Scraper,
    VidsrcsuServer3Scraper,
    VidsrcsuServer4Scraper,
    VidsrcsuServer5Scraper,
    VidsrcsuServer6Scraper,
    VidsrcsuServer7Scraper,
    VidsrcsuServer8Scraper,
    VidsrcsuServer9Scraper,
    VidsrcsuServer10Scraper,
    VidsrcsuServer11Scraper,
    VidsrcsuServer12Scraper,
    VidsrcsuServer20Scraper,
    viperScraper,
    streamwishJapaneseScraper,
    streamwishLatinoScraper,
    streamwishSpanishScraper,
    streamwishEnglishScraper,
    streamtapeLatinoScraper,
    ...cinemaosEmbeds,
    // ...cinemaosHexaEmbeds,
  ];
}
