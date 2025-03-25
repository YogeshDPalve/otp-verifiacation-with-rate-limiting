import { body, validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

const validateRegistration = [
  body("MobileNo")
    .notEmpty()
    .withMessage("Mibile Number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Enter valid mobile Number"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
        message: "Error in Input validation",
      }); 
    }

    next();
  },
];

const validateOtp = [
  body("otp")
    .notEmpty()
    .withMessage("OTP required.")
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP should be 6 digits"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        success: false,
        errors: errors.array(),
        message: "Error in Input validation",
      });
    }
    next();
  },
];

export { validateRegistration, validateOtp };
