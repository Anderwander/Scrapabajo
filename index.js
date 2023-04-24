import express from "express";
import path from "path";
import stackoverflowController from "./controllers/stackoverflowController.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    const _dirname = path.resolve();
    res.sendFile(_dirname + "/index.html");
  } catch (error) {
    res
      .status(500)
      .send("Que seas paranoico no quiere decir que no te sigan...");
  }
});

app.get("/search", async (req, res) => {
  //try {
  const query = req.query.query;
  const response = await stackoverflowController.getMultipleContent(query);
  console.log("ESTO ES :", response);
  const { questionContent, answerContent } = response[0];
  res.send(`<link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Shared/stacks.css?v=83d4b324173a">
    <link rel="stylesheet" type="text/css" href="https://cdn.sstatic.net/Sites/stackoverflow/primary.css?v=c130dd38fbf5">
        <h1>${questionContent.title}</h1>
        <div>${questionContent.questionContent}</div>
        <div>${questionContent.userName}</div>
        <div>${questionContent.votes}</div>
        <div>${answerContent
          .map(
            (answer) => `
            <div>${answer.userName}</div>
            <div>${answer.votes}</div>
            <div>${answer.answers}</div> 
        `
          )
          .join("")}</div>`);
  /* } catch (error) {
    throw new Error(error);
    res.status(500).send("TONTOOOOO...");
  } */
});

app.get("/", async (req, res) => {
  try {
    const query = req.query.q;
    const content = await stackoverflowController.getMultipleContent(query);
    res.status(500).send(content);
  } catch (error) {
    res.send("Que seas paranoico no quiere decir que no seas paranoico...");
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3001");
});
