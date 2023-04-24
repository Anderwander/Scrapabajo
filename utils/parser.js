import jsdom from "jsdom";

/**
 * Clase que se encarga de parsear el html de una página web
 * @class
 * @private
 */
class Parser {
  /**
   * Constructor de la clase
   * @constructor
   * @private
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
   * @private
   * @returns {string}- Título de la página
   */
  getTitle() {
    return this.document.querySelector("h1").textContent;
  }

  /**
   * Obtiene la fecha en formato "hace tiempo" de una pregunta
   * @method
   * @private
   * @returns {string} - Fecha en formato "hace tiempo"
   */
  getDateAgo() {
    return this.document.querySelector(".d-flex time").textContent;
  }

  /**
   * Obtiene el número de votos de un elemento
   * @method
   * @private
   * @param {Element} element - Elemento del cual obtener el número de votos
   * @returns {number} - Número de votos
   */
  getVoteCount(element) {
    const votes = element.querySelector(
      ".js-voting-container .js-vote-count"
    ).textContent;
    return parseInt(votes);
  }

  /**
   * Obtiene el elemento DOM de la pregunta
   * @method
   * @private
   * @returns {Element} - Elemento DOM de la pregunta
   */
  getQuestionDom() {
    return this.document.querySelector(".question");
  }

  /**
   * Obtiene la información de la pregunta
   * @method
   * @private
   * @returns {Object} - Objeto con la información de la pregunta
   * @property {string} title - Título de la pregunta
   * @property {number} votes - Número de votos de la pregunta
   * @property {string} date - Fecha en formato "hace tiempo" de la pregunta
   * @property {string} userName - Nombre de usuario que hizo la pregunta
   * @property {string} questionContent - Contenido HTML de la pregunta
   */
  getQuestion() {
    const question = this.getQuestionDom();
    const title = this.getTitle();
    const votes = this.getVoteCount(question);
    const date = this.getDateAgo(question);
    const userName = this.getUserName(question);
    const questionContent = question.outerHTML;
    return {
      title,
      votes,
      date,
      userName,
      questionContent,
    };
  }

  /**
   * Obtiene el nombre de usuario de un elemento
   * @method
   * @private
   * @param {Element} element - Elemento del cual obtener el nombre de usuario
   * @returns {string} - Nombre de usuario
   */
  getUserName(element) {
    const userName = Array.from(element.querySelectorAll(".user-details a"));
    if (userName.length == 0) return "";
    if (userName.length == 1) return userName[0].textContent.trim();
    return userName[userName.length - 1].textContent.trim();
  }

  /**
   * Obtiene los elementos DOM de las respuestas en el documento.
   * @method
   * @private
   * @returns {Element[]} - Elementos DOM de las respuestas.
   */
  getAnswersDom() {
    return Array.from(this.document.querySelectorAll(".answer"));
  }

  /**
   * Obtiene los enlaces (href) del documento.
   * @method
   * @private
   * @returns {string[]} - Arreglo de enlaces del documento.
   */
  getLinks() {
    const links = Array.from(this.document.querySelectorAll("a")).map(
      (link) => link.href
    );
    return links;
  }

  /**
   * Obtiene las respuestas del documento.
   * @method
   * @private
   * @returns {Object[]} - Arreglo de respuestas con sus detalles.
   * @property {number} votes - Cantidad de votos de la respuesta.
   * @property {string} date - Fecha de la respuesta.
   * @property {string} userName - Nombre de usuario de la respuesta.
   * @property {string} answers - HTML de la respuesta.
   */
  getAnswers() {
    const answers = this.getAnswersDom();
    return answers.map((answer) => {
      const votes = this.getVoteCount(answer);
      const date = this.getDateAgo(answer);
      const userName = this.getUserName(answer);
      return {
        votes,
        date,
        userName,
        answers: answer.outerHTML,
      };
    });
  }
}

export default Parser;
