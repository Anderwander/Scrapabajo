import puppeteer from "puppeteer";

/**
 * Clase para realizar scraping web con Puppeteer.
 * @class
 * @private
 */
class Scraper {
  /**
   * Constructor de la clase Scraper.
   * @constructor
   * @private
   */
  constructor() {
    this.browser = null;
    this.page = null;
  }
  /**
   * Inicializa el navegador y crea una nueva página.
   * @async
   * @private
   * @returns {Promise<void>} Una promesa que se resuelve cuando el navegador y la página han sido creados.
   */
  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();
  }

  /**
   * Obtiene el contenido de una página web.
   * @async
   * @private
   * @param {string} url - La URL de la página web a obtener el contenido.
   * @returns {Promise<string>} Una promesa que se resuelve con el contenido de la página web.
   */

  async getPageContent(url) {
    await this.page.goto(url);
    return await this.page.content();
  }

  /**
   * Cierra el navegador.
   * @async
   * @private
   * @returns {Promise<void>} Una promesa que se resuelve cuando el navegador ha sido cerrado.
   */
  async close() {
    await this.browser.close();
  }
}

export default Scraper;
