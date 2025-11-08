import express from "express";
import SportController from "../controllers/sport.controller.js";
import {
  protect,
  requireRole,
  requireRoles,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { sportSchema } from "../validation/schemas/sport.schema.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  requireRole("admin"),
  validate(sportSchema),
  SportController.createSport
);
router.post(
  "/edit/:id",
  protect,
  requireRole("admin"),
  validate(sportSchema),
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
