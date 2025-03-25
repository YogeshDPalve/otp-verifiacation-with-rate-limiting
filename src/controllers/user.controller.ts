import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import redis from "../utils/redis";
import sendOtp from "../utils/twilio";
// prisma
const prisma = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
  try {
    const { MobileNo } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { MobileNo },
    });
    if (existingUser) {
      res.status(404).send({
        success: false,
        message: "Mobile No is already exists",
      });
      return;
    }

    const createUser = await prisma.user.create({
      data: {
        MobileNo,
      },
    });
    console.log("user created:", createUser);

    res.status(200).send({
      success: true,
      message: "User created Successfully",
    });
    return;
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error,
    });
    return;
  }
};

const generateOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const tokenExpiryTime = process.env.TOKEN_EXPIRY_TIME as string;
    const { MobileNo } = req.body;

    const existingUser = await prisma.user.findFirst({ where: { MobileNo } });
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User not exists please register your mobile number first",
      });
    }
    // Genetating otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store or update the OTP in Redis with a fresh 10-minute expiry
    await redis.set(MobileNo, otp, "EX", tokenExpiryTime);
    const result = await redis.get(MobileNo);
    console.log(`Stored OTP: ${result}`);

    // send otp to user via sms
    sendOtp(otp, MobileNo, tokenExpiryTime, res);
  } catch (error) {
    console.error("Error resending OTP:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

const verifyOtp = async (req: Request, res: Response): Promise<any> => {
  try {
    const { MobileNo, otp } = req.body;

    if (!MobileNo || !otp) {
      return res.status(400).send({
        success: false,
        message: "Mobile No and OTP are required",
      });
    }

    const existingUser = await prisma.user.findFirst({ where: { MobileNo } });
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "User not exists please register your mobile number first",
      });
    }

    // Check if the entered mobileNo has an OTP
    const storedOtp = await redis.get(MobileNo);

    if (!storedOtp) {
      return res.status(400).send({
        success: false,
        message: "OTP expired or does not exist",
      });
    }

    // Check if the entered OTP exists for another mobile number
    const allKeys = await redis.keys("*"); // Get all stored mobile numbers
    for (const key of allKeys) {
      if (key !== MobileNo) {
        // Ensure we are not checking the same number
        const otpForOther = await redis.get(key);
        if (otpForOther === otp) {
          return res.status(400).send({
            success: false,
            message: "This OTP is already being used for another mobile number",
          });
        }
      }
    }

    // Verify the OTP for the current mobile number
    if (storedOtp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP is correct, delete it from Redis
    await redis.del(MobileNo);
    const verified = await prisma.user.update({
      where: {
        MobileNo,
      },
      data: {
        isVerified: true,
      },
    });
    return res.status(200).send({
      success: true,
      message: "OTP verified successfully",
      verified,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};
export { generateOtp, registerUser, verifyOtp };
