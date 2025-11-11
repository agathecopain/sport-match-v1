import express from "express";
import PostController from "../controllers/post.controller.js";
import {
  protect,
  requireRole,
  requireRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, PostController.createPost);
router.post(
  "/edit/:id",
  protect,
  requireRoles("user", "admin"),
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

export default router;
