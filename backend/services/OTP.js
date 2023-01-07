import otpGenerator from "otp-generator";
import {OTP_LENGTH,OTP_CONFIG} from "../constants/constants.js";

export function generateOTP(){
    const OTP = otpGenerator.generate(OTP_LENGTH,OTP_CONFIG);
    return OTP;
}