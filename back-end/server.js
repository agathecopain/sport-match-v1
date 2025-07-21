import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vérification de mise en place du serveur");
});

app.listen(PORT, () => {
  console.log(`le serveur tourne sur : http://localhost:${PORT}`);
});
