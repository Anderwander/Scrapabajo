import Scraper from "../utils/scraper.js";
import Parser from "../utils/parser.js";

/**
 * Función asincrónica para realizar una búsqueda en Google y obtener los enlaces de los resultados.
 * @function
 * @private
 * @async
 * @param {string} query - El término de búsqueda a utilizar en Google.
 * @returns {Promise<Array<string>>} - Una promesa que se resuelve con un array de enlaces obtenidos de los resultados de búsqueda.
 * @throws {Error} - Si ocurre un error durante el proceso de búsqueda y extracción de enlaces.
 */
async function searchLinks(query) {
  //scraper
  const scraper = new Scraper();
  await scraper.init();

  // Codificar el término de búsqueda para incluir en la URL
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.google.com/search?q=${encodedQuery}`;

  // Obtener el contenido de la página de resultados de búsqueda
  const content = await scraper.getPageContent(url);

  //parser
  const parser = new Parser(content);

  // Obtener los enlaces de los resultados de búsqueda
  const links = parser.getLinks();
  await scraper.close();

  return links;
}

export default {
  searchLinks,
};
