import Parser from "../../utils/parser.js";
import fs from "fs";

describe("Parser", () => {
  let parser;
  beforeAll(() => {
    const html = fs.readFileSync("./test/test.html", "utf8");
    parser = new Parser(html);
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
    const qVoteCount = parser.getQuestionVoteCount();
    console.log(`jeje${qVoteCount}jeje`);
    console.log(qVoteCount.length);
    expect(qVoteCount).toBe("79"); //Aquí por qué toContain y no toBe?
  });

  /* it("Debería coger el contenido de la pregunta", () => {
    const question = parser.getQuestionContent();
    expect(question).toContain(
      "I am a newbie to jest and JavaScript. I am trying to write a test to compare innerHTML. It is not working. Any ideas how to make it work?"
    );
  }); */

  /* it("Debería darte todas las respuestas", () => {
    const firstAnswer = parser.getFirstAnswer();
    expect(firstAnswer).toContain("Adding to @mihai's answer:");
  }); */
});
