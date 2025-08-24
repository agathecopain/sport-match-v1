import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  loginSchema,
  passwordResetRequestSchema,
  registerSchema,
  resetPasswordSchema,
} from "../validation/schemas/user.schema.js";
import authController from "../controllers/auth.controller.js";
import {
  limiter,
} from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  limiter(10),
  AuthController.register
);

router.get("/verify/:token", AuthController.verifyEmail);

router.post("/login", validate(loginSchema), limiter(10), AuthController.login);

router.post("/logout", AuthController.logout);

router.post(
  "/password-reset-request",
  validate(passwordResetRequestSchema),
  limiter(10),
  AuthController.requestPasswordReset
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  limiter(10),
  AuthController.resetPassword
);

router.post("/resend-verification", AuthController.resendVerificationEmail);

export default router;
