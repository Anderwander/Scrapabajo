/**
 * Módulo que proporciona pruebas unitarias para la clase Parser.
 * @module ParserTests
 */
import Parser from "../../utils/parser.js";
import fs from "fs";

describe("Parser", () => {
  let parser;
  beforeAll(() => {
    const html = fs.readFileSync("./test/test.html", "utf8");
    parser = new Parser(html);
  });

  /**
   * Prueba unitaria para el método getLinks() de la clase Parser.
   * @private
   */
  it("Debería buscar los links de la página", () => {
    const links = parser.getLinks();
    expect(links[0]).toContain("about:blank#");
  });

  /**
   * Prueba unitaria para el método getTitle() de la clase Parser.
   */
  it("Debería buscar el título de la pregunta", () => {
    const title = parser.getTitle();
    expect(title).toBe("Error: Failed to lookup view in Express");
  });

  /**
   * Prueba unitaria para el método getDateAgo() de la clase Parser.
   */
  it("Debería buscar la fecha de creación de la pregunta", () => {
    const date = parser.getDateAgo();
    expect(date).toBe("11 years ago");
  });

  /**
   * Prueba unitaria para el método getVoteCount() de la clase Parser.
   */
  it("Debería buscar la puntuación de la pregunta", () => {
    const question = parser.getQuestionDom();
    const VoteCount = parser.getVoteCount(question);
    expect(VoteCount).toBe(79);
  });

  /**
   * Prueba unitaria para el método getQuestionDom() de la clase Parser.
   */
  it("debería sacar la pregunta en formato DOM", () => {
    const question = parser.getQuestionDom();
    expect(question.innerHTML).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
  });

  /**
   * Prueba unitaria para el método getQuestion() de la clase Parser.
   */
  it("Debería coger tooooooooddooooo el contenido de la pregunta", () => {
    const question = parser.getQuestion();
    expect(question.votes).toBe(79);
    expect(question.title).toBe("Error: Failed to lookup view in Express");
    expect(question.date).toBe("11 years ago");
    expect(question.userName).toBe("nax");
    expect(question.questionContent).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
  });

  /**
   * Prueba unitaria para el método getUserName() de la clase Parser en respuestas.
   */
  it("Debería darte el nombre de usuario de la respuesta", () => {
    const answer = parser.getAnswersDom()[0];
    const userName = parser.getUserName(answer);
    expect(userName).toContain("Veera");
  });

  /**
   * Prueba unitaria para el método getUserName() de la clase Parser en preguntas.
   */
  it("Debería darte el nombre de usuario de la pregunta", () => {
    const question = parser.getQuestionDom();
    const userName = parser.getUserName(question);
    expect(userName).toContain("nax");
  });

  /* it("Debería dar el contenido solo los parrafos de la pregunta", () => {
    const content = parser.getQuestionContent();
    expect(content).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
  }); */

  /**
   * Prueba unitaria para obtener todas las respuestas.
   */
  it("Debería darte todas las respuestas", () => {
    const answers = parser.getAnswersDom();
    expect(answers[0].innerHTML).toContain("Adding to @mihai's answer:");
  });

  /**
   * Prueba unitaria para mostrar el contenido de una respuesta.
   */
  it("Debería mostrar el contenido de la respuesta", () => {
    const answerContent = parser.getAnswers()[0];
    expect(answerContent.answer).toContain("Adding to @mihai's answer:");
  });
});
