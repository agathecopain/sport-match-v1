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

const router = express.Router();

router.post("/register", validate(registerSchema), AuthController.register);

router.get("/verify/:token", AuthController.verifyEmail);

router.post("/login", validate(loginSchema), AuthController.login);

router.post("/logout", AuthController.logout);

router.post(
  "/password-reset-request",
  validate(passwordResetRequestSchema),
  AuthController.requestPasswordReset
);

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  AuthController.resetPassword
);

router.post("/resend-verification", AuthController.resendVerificationEmail);

export default router;
