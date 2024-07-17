import express from "express"
import cors from "cors"
import db from "./config/db.js"
import router from "./routes/routes.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

try {
    await db.authenticate()
    console.log("Conexion exitosa a la base de datos");
} catch (error) {
    console.log(`Error ${error}`);
};

const PUERTO = 8000;

app.listen(PUERTO, () => {
    console.log(`Corriendo en http://localhost:${PUERTO}`);
});