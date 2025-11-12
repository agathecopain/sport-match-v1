import express from "express";
import PostController from "../controllers/post.controller.js";
import {
  protect,
  requireRole,
  requireRoles,
} from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validation/schemas/post.schema.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  validate(createPostSchema),
  PostController.createPost
);
router.post(
  "/edit/:id",
  protect,
  requireRoles("user", "admin"),
  validate(updatePostSchema),
  PostController.updatePost
);
router.post(
  "/delete/:id",
  protect,
  requireRoles("user", "admin"),
  PostController.deletePost
);
router.post(
  "/:id/suspend",
  protect,
  requireRole("admin"),
  PostController.suspendPost
);
router.get("/:id", PostController.getPostById);
router.get("/", PostController.getPosts);

router.get("/api/city", PostController.getCity);

export default router;
