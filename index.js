import express from "express";
import stackoverflowController from "./controllers/stackoverflowController.js";

const app = express();

app.get("/", async (req, res) => {
  const query = req.query.q;
  //   const { title, links, paragraphs, images } =
  //     await stackoverflowController.getContent(query);
  //   res.send(
  //     `<h1>${title}</h1>
  //   <p>${paragraphs[1]}</p>
  //   <img src="${images[1]}">`
  //   );
  const data = await stackoverflowController.getContent(query);
  res.send(data);
});

app.listen(3030, () => {
  console.log("Server started on port 3030");
});
