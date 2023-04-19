import jsdom from "jsdom";

/**
 * Clase que se encarga de parsear el html de una página web
 * @class
 */
class Parser {
  /**
   * Constructor de la clase
   * @constructor
   * @param {string} html - html de la página web
   */
  constructor(html) {
    /**
     * @property {string} html - html de la página web
     * @private
     */
    this.html = html;
    this.loadDocument();
  }
  /**
   * Carga el html en un objeto de tipo document
   * @method
   * @private
   * @returns {void}
   */
  loadDocument() {
    const JSDOM = jsdom.JSDOM;
    const dom = new JSDOM(this.html);
    this.document = dom.window.document;
  }
  /**
   * Devuelve el título de una página web
   * @method
   * @public
   * @returns {string}- Título de la página
   */
  getTitle() {
    return this.document.querySelector("h1").textContent;
  }
  getDateAgo() {
    return this.document.querySelector(".d-flex time").textContent;
  }

  getQuestionVoteCount() {
    return this.document
      .querySelector(".js-voting-container .js-vote-count")
      .textContent.trim();
  }
  /* getQuestionContent() {
    return this.document.querySelector("div.postcell").innerHTML;
  } */
  /* getFirstAnswer() {
    return this.document.querySelectorAll(
      "div.answercell:first-of-type .s-prose p"
    );
  } */
  // /**
  //  * Devuelve links de una página web
  //  * @method
  //  * @returns {string[]}- links de la página
  //  */
  // getLinks() {
  //   const links = Array.from(this.document.querySelectorAll("a")).map(
  //     (link) => link.href
  //   );
  //   return links;
  // }
  // /**
  //  * Devuelve los párrafos de una página web
  //  * @method
  //  * @returns {string[]}- párrafos de la página
  //  */
  // getParagraphs() {
  //   const paragraphs = Array.from(this.document.querySelectorAll("p"));
  //   return paragraphs.map((p) => p.textContent);
  // }
  // /**
  //  * Devuelve los imágenes de una página web
  //  * @method
  //  * @returns {string[]}- Imagenes de la página
  //  * @example
  //  * // returns "https://es.wikipedia.org/wiki/Wikipedia:Portada#/media/Archivo:Otakuthon_2014-_Super_Smash_Bros._(15029311692).jpg"
  //  */
  // getImages() {
  //   const images = Array.from(this.document.querySelectorAll("img")).map(
  //     (image) => image.src
  //   );
  //   return images;
  // }
}

export default Parser;
