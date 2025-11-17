import express from "express";
import SportController from "../controllers/sport.controller.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  sportSchema,
  sportUpdateSchema,
} from "../validation/schemas/sport.schema.js";
import { uploadSportIcon } from "../middlewares/upload.js";
import csurf from "csurf";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.post(
  "/create",
  csrfProtection,
  protect,
  requireRole("admin"),
  uploadSportIcon.single("iconeUrl"),
  validate(sportSchema),
  SportController.createSport
);
router.post(
  "/edit/:id",
  csrfProtection,
  protect,
  requireRole("admin"),
  uploadSportIcon.single("iconeUrl"),
  validate(sportUpdateSchema),
  SportController.updateSport
);
router.post(
  "/delete/:id",
  csrfProtection,
  protect,
  requireRole("admin"),
  SportController.deleteSport
);
router.get("/", SportController.getAllSports);
router.get("/:id", SportController.getSportById);

export default router;
