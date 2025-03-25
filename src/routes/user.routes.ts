import { Router } from "express";
import {
  generateOtp,
  registerUser,
  verifyOtp,
} from "../controllers/user.controller";
import {
  validateOtp,
  validateRegistration,
} from "../middlewares/validationMiddleware";
import { ValidationChain } from "express-validator";
import {
  cooldownTime,
  otpLimiter,
  verifyOtpLimiter,
} from "../middlewares/rateLimiter";

const router: Router = Router();

router.post(
  "/register",
  validateRegistration as ValidationChain[],
  registerUser
);

router.post(
  "/generate-otp",
  validateRegistration as ValidationChain[],
  cooldownTime, // cool down time for 2 min
  otpLimiter, // rate limiter 5 request per 5 min
  generateOtp
);

router.post(
  "/verify",
  verifyOtpLimiter,
  validateOtp as ValidationChain[],
  verifyOtp
);

export default router;
