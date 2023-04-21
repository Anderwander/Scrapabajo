import Parser from "../utils/parser.js";
import Scraper from "../utils/scraper.js";
import googleController from "./googleController.js";

async function getContent(query) {
  const googleLinks = await googleController.searchLinks(
    "stackoverflow" + query
  );
  const url = googleLinks.find((link) => link.includes("stackoverflow.com"));

  //scraper
  const scraper = new Scraper();
  await scraper.init();

  const content = await scraper.getPageContent(url);
  //parser
  const parser = new Parser(content);
  const title = parser.getTitle();
  /* const links = parser.getLinks();
  const images = parser.getImages();
  const paragraphs = parser.getParagraphs(); */

  await scraper.close();

  return { title /* links, paragraphs, images */ };
}

export default {
  getContent,
};
