import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import sportRoutes from "./routes/sport.routes.js";
import postRoutes from "./routes/post.routes.js";
import csurf from "csurf";
import mongoSanitize from "express-mongo-sanitize";
import "./scripts/awakeRender.js";

const PORT = process.env.PORT || 5050;
const app = express();

connectDB();

app.use(express.json());

/*---- Sécurité ----*/
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, _res, next) => {
	Object.defineProperty(req, 'query', {
		...Object.getOwnPropertyDescriptor(req, 'query'),
		value: req.query,
		writable: true,
	})

	next()
})
app.use(mongoSanitize());

/*---- Routes ----*/
app.use("/auth", authRoutes);
app.use("/sport", sportRoutes);
app.use("/post", postRoutes);

app.get("/", (req, res) => {
  res.send("Vérification de mise en place du serveur");
});

/*---- Server ----*/
const server = app.listen(PORT, () => {
  console.log(`le serveur tourne sur : http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
