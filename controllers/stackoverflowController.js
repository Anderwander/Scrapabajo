import Parser from "../utils/parser.js";
import Scraper from "../utils/scraper.js";
import googleController from "./googleController.js";
import Question from "../models/question.js";
import Answer from "../models/answer.js";

async function getStackoverflowUrls(query) {
  const googleLinks = await googleController.searchLinks(
    "stackoverflow" + query
  );
  const urls = googleLinks.filter((link) =>
    link.includes("stackoverflow.com/questions")
  );
  return urls;
}

async function getMultipleContent(query) {
  const links = await getStackoverflowUrls(query);
  const contents = await Promise.all(
    links.map((link) => getContent(link, query))
  );
  return contents;
}

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
