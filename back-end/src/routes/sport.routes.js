import express from "express";
import SportController from "../controllers/sport.controller.js";
import { protect, requireRole } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  sportSchema,
  sportUpdateSchema,
} from "../validation/schemas/sport.schema.js";
import { uploadSportIcon } from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  requireRole("admin"),
  uploadSportIcon.single("iconeUrl"),
  validate(sportSchema),
  SportController.createSport
);
router.post(
  "/edit/:id",
  protect,
  requireRole("admin"),
  uploadSportIcon.single("iconeUrl"),
  validate(sportUpdateSchema),
  SportController.updateSport
);
router.post(
  "/delete/:id",
  protect,
  requireRole("admin"),
  SportController.deleteSport
);
router.get("/", SportController.getAllSports);
router.get("/:id", SportController.getSportById);

export default router;
