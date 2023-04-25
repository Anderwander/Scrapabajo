import Parser from "../utils/parser.js";
import Scraper from "../utils/scraper.js";
import googleController from "./googleController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";

/**
 * Obtiene URLs de Stack Overflow relacionadas con una consulta dada.
 * @private
 * @async
 * @function
 * @param {string} query - Consulta de búsqueda.
 * @returns {Promise<string[]>} - Array de URLs de Stack Overflow.
 */
async function getStackoverflowUrls(query) {
  const googleLinks = await googleController.searchLinks(
    "stackoverflow" + query
  );
  const urls = googleLinks.filter((link) =>
    link.includes("stackoverflow.com/questions")
  );
  return urls;
}

/**
 * Obtiene el contenido de múltiples URLs de Stack Overflow relacionadas con una consulta dada.
 * @private
 * @async
 * @function
 * @param {string} query - Consulta de búsqueda.
 * @returns {Promise<object[]>} - Array de objetos con el contenido de las URLs.
 */
async function getMultipleContent(query) {
  const links = await getStackoverflowUrls(query);
  const contents = await Promise.all(
    links.map((link) => getContent(link, query))
  );
  return contents;
}

/**
 * Obtiene el contenido de una URL de Stack Overflow y lo guarda en la base de datos.
 * @private
 * @async
 * @function
 * @param {string} url - URL de Stack Overflow.
 * @param {string} query - Consulta de búsqueda.
 * @returns {Promise<object>} - Objeto con el contenido obtenido de la URL.
 */
async function getContent(url, query) {
  //scraper
  const scraper = new Scraper();
  await scraper.init();

  const content = await scraper.getPageContent(url);
  //parser
  const parser = new Parser(content);
  if (!query) query = "Undefined";

  const links = parser.getLinks();
  const questionContent = parser.getQuestion();
  const answerContent = parser.getAnswers();
  const question = new Question({
    query,
    title: questionContent.title,
    links,
    votes: questionContent.votes,
    date: questionContent.date,
    userName: questionContent.userName,
    content: questionContent.questionContent,
  });

  await question.save();

  answerContent.forEach(async (element) => {
    const answerModel = new Answer({
      content: element.answers,
      votes: element.votes,
      question: question._id,
      date: element.date,
      userName: element.userName,
    });
    await answerModel.save();
  });

  await scraper.close();

  return {
    links,
    questionContent,
    answerContent,
  };
}

export default {
  getContent,
  getMultipleContent,
};
