import stackoverflowController from "../../controllers/stackoverflowController.js";

describe("stackoverflow controller", () => {
  it("Debería mostrar el contenido de la página", async () => {
    const query = "Error: Failed to lookup view in Express";
    const { questionContent, answerContent } =
      await stackoverflowController.getContent(query);
    expect(questionContent.questionContent).toContain(
      "I'm trying to make a better experience of nodeJS and i don't really like to get all the script in one file."
    );
    expect(questionContent.userName).toContain("nax");
    expect(questionContent.votes).toEqual(79);
    expect(questionContent.date).toContain("11 years ago");
    expect(answerContent[0].answers).toContain("Adding to @mihai's answer:");
    expect(answerContent[0].userName).toContain("");
  }, 20000);
});
