import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";

async function searchLinks(query) {
  //scraper
  const scraper = new Scraper();
  await scraper.init();

  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${encodedQuery}`;
  const content = await scraper.getPageContent(url);
  //parser
  const parser = new Parser(content);
  const links = parser.getLinks(url);
  await scraper.close();

  return links;
}

export default {
  searchLinks,
};
