import twilio from "twilio";
import { Response } from "express";
// Twilio
const accountSid = (process.env.TWILIO_ACCOUNT_SID as string) || "";
const authToken = (process.env.TWILIO_AUTH_TOKEN as string) || "";
const twilioMibleNo = (process.env.TWILIO_MOBILE_NO as string) || "";
const client = twilio(accountSid, authToken);

const sendOtp = async (
  otp: string,
  clientNo: string,
  tokenExpiryTime: string,
  res: Response
) => {
  try {
    // calculation token expirty time in minutes
    const expireTime = Number(tokenExpiryTime) / 60;

    // sending otp to user via sms
    const message = await client.messages.create({
      from: twilioMibleNo,
      to: `+91${clientNo}`,
      body: `Your OTP is ${otp}. It is valid for ${expireTime} minutes. Do not share this code with anyone.`,
    });

    return res.status(200).send({
      success: true,
      msg: "OTP sent successfully",
      message,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: true,
      message: "Internal server error to send otp",
      otp: otp,
    });
  }
};

export default sendOtp;
