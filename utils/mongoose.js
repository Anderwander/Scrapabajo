/**
 * Módulo que proporciona la conexión a la base de datos MongoDB utilizando Mongoose.
 * @module db
 */
import mongoose from "mongoose";

const host = "mongo-stack";
const port = 27017;
const db = "stack";
const MONGODB_URI = `mongodb://${host}:${port}/${db}`;

/**
 * Conexión a la base de datos MongoDB.
 * @async
 * @function
 * @returns {Promise<void>} - Promesa que se resuelve cuando se establece la conexión con éxito.
 * @throws {Error} - Error que se produce si no se puede establecer la conexión.
 */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectarse a MongoDB: ", error));

export default mongoose;
