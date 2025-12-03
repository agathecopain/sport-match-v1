import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import sportRoutes from "./routes/sport.routes.js";
import postRoutes from "./routes/post.routes.js";
import cors from "cors";
import csurf from "csurf";
import mongoSanitize from "express-mongo-sanitize";
import "./scripts/awakeRender.js";

const PORT = process.env.PORT || 5050;
const app = express();
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

connectDB();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Requête serveur à serveur
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origine autorisée
    } else {
      callback(new Error("Origine non autorisée par CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors());

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
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });

  next();
});
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
