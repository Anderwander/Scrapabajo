import Parser from "../../utils/parser.js";
import fs from "fs";

describe("Parser", () => {
  let parser;
  beforeAll(() => {
    const html = fs.readFileSync("./test/test.html", "utf8");
    parser = new Parser(html);
  });

  it("Debería buscar los links de la página", () => {
    const links = parser.getLinks();
    expect(links[0]).toEqual("about:blank#");
  });

  it("Debería buscar el título de la pregunta", () => {
    const title = parser.getTitle();
    expect(title).toBe("Error: Failed to lookup view in Express");
  });

  it("Debería buscar la fecha de creación de la pregunta", () => {
    const date = parser.getDateAgo();
    expect(date).toBe("11 years ago");
  });

  it("Debería buscar la puntuación de la pregunta", () => {
    const question = parser.getQuestionDom();
    const VoteCount = parser.getVoteCount(question);
    expect(VoteCount).toBe(79);
  });

  it("debería sacar la pregunta en formato DOM", () => {
    const question = parser.getQuestionDom();
    expect(question.innerHTML).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
  });

  it("Debería coger tooooooooddooooo el contenido de la pregunta", () => {
    const question = parser.getQuestion();
    expect(question.votes).toBe(79);
    expect(question.title).toBe("Error: Failed to lookup view in Express");
    expect(question.date).toBe("11 years ago");
    //expect(question.userName).toBe("nax");
    expect(question.questionContent).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
  });

  /* it("Debería darte el nombre de usuario de la pregunta", () => {
    const userName = parser.getUserName();
    console.log("THIS IS :", userName);
    expect(userName[0]).toContain("nax");
  }); */

  it("Debería dar el contenido solo los parrafos de la pregunta", () => {
    const content = parser.getQuestionContent();
    expect(content).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
  });

  it("Debería darte todas las respuestas", () => {
    const answers = parser.getAnswersDom();
    expect(answers[0].innerHTML).toContain("Adding to @mihai's answer:");
  });

  it("Debería mostrar el contenido de la respuesta", () => {
    const answer = parser.getAnswersDom()[0];
    const answerContent = parser.getAnswerContent(answer);
    expect(answerContent).toContain("Adding to @mihai's answer:");
  });
});
