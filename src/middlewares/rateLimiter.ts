import { rateLimit } from "express-rate-limit";

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  max: 4, // Limit each IP to 4 requests per windowMs
  message: "You have exceeded the allowed request limit. Try again later.",
});

const cooldownTime = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 min
  max: 1, // Limit each IP to 1 requests per windowMs
  message: "You have exceeded the allowed request limit. Try again later.",
});
export { otpLimiter, cooldownTime };
