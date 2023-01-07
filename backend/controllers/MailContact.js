import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.APP_EMAIL_ID,
        pass:process.env.APP_EMAIL_PASSWORD
    },
});

//Incomplete