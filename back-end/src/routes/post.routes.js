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
import csurf from "csurf";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.post(
  "/create",
  csrfProtection,
  protect,
  validate(createPostSchema),
  PostController.createPost
);
router.post(
  "/edit/:id",
  csrfProtection,
  protect,
  requireRoles("user", "admin"),
  validate(updatePostSchema),
  PostController.updatePost
);
router.post(
  "/delete/:id",
  csrfProtection,
  protect,
  requireRoles("user", "admin"),
  PostController.deletePost
);
router.post(
  "/:id/suspend",
  csrfProtection,
  protect,
  requireRole("admin"),
  PostController.suspendPost
);
router.get("/:id", PostController.getPostById);
router.get("/", PostController.getPosts);

router.get("/api/city", PostController.getCity);
router.get("/api/post-code", PostController.getPostCode);

export default router;
