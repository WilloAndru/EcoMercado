import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "EcoMercado API running" });
});

app.use("/api", router);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Acceso concedido a contenido protegido" });
});

export default app;
