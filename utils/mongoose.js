import mongoose from "mongoose";
const host = "mongo-stack";
const port = 27017;
const db = "stack";
const MONGODB_URI = `mongodb://${host}:${port}/${db}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectarse a MongoDB: ", error));

export default mongoose;
