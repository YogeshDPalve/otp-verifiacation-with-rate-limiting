import { Router } from "express";
import {
  generateOtp,
  resendOtp,
  verifyOtp,
} from "../controllers/user.controller";
import {
  validateOtp,
  validateRegistration,
} from "../middlewares/validationMiddleware";
import { ValidationChain } from "express-validator";
import { cooldownTime, otpLimiter } from "../middlewares/rateLimiter";

const router: Router = Router();

router.post(
  "/generate",
  validateRegistration as ValidationChain[],
  generateOtp
);

router.post(
  "/regenerate",
  validateRegistration as ValidationChain[],
  cooldownTime,
  otpLimiter,
  resendOtp
);
router.post("/verify", validateOtp as ValidationChain[], verifyOtp);

export default router;
