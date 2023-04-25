import express from "express";
import path from "path";
import stackoverflowController from "./controllers/stackoverflowController.js";

/**
 * @description Aplicación express para el controlador de Stackoverflow.
 * @constant
 * @public
 * @name app
 * @type {object}
 */
const app = express();

/**
 * @description Ruta para la página de inicio.
 * @function
 * @public
 * @name app.get/
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @returns {undefined}
 */
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

/**
 * @description Ruta para la búsqueda de contenido.
 * @function
 * @public
 * @name app.get/search
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @returns {undefined}
 */

/* app.get("/search", async (req, res) => {
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
}); */

/**
 * @public
 * @description Ruta para la página de inicio.
 * @function
 * @name app.get/
 * @param {object} req - Objeto de solicitud.
 * @param {object} res - Objeto de respuesta.
 * @returns {undefined}
 */
app.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const content = await stackoverflowController.getMultipleContent(query);
    res.status(500).send(content);
  } catch (error) {
    res.send("Que seas paranoico no quiere decir que no seas paranoico...");
  }
});

/**
 * @public
 * @description Iniciar el servidor en el puerto 3000.
 * @function
 * @name app.listen
 * @param {number} port - Puerto en el que se inicia el servidor.
 * @returns {undefined}
 */
app.listen(3000, () => {
  console.log("Server started on port 3001");
});
/* } catch (error) {
    throw new Error(error);
    res.status(500).send("TONTOOOOO...");
  } */
