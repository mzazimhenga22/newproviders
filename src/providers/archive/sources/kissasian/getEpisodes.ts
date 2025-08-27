import * as cheerio from 'cheerio';

export function getEpisodes(dramaPage: cheerio.CheerioAPI) {
  const episodesEl = dramaPage('.episodeSub');

  return episodesEl
    .toArray()
    .map((ep: any) => {
      const number = dramaPage(ep).find('.episodeSub a').text().split('Episode')[1]?.trim();
      const url = dramaPage(ep).find('.episodeSub a').attr('href');
      return { number, url };
    })
    .filter((e: any) => !!e.url);
}
