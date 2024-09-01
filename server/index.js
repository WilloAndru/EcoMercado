import express from "express"
import cors from "cors"
import db from "./config/db.js"
import router from "./routes/routes.js"
import { authMiddleware } from "./middleware/authMiddleware.js"

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://3.15.194.3:5173']
}));
app.use(express.json());
app.use("/api", router);
app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Acceso concedido a contenido protegido' });
})

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