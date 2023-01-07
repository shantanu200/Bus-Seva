import express from "express";
import Contact from "../models/ContactDetails.js";
import SendmailTransport from "nodemailer/lib/sendmail-transport/index.js";
import { generateOTP } from "../services/OTP.js";
import { sendContactFeedback } from "../services/MAIL.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  if (!req.body) res.status(500).json("No Data found from user");
  const { fullname, email, message } = req.body;
  const contact = await Contact(req.body);

  contact.save().then(() => {
    const otp = generateOTP();
    const expDate = new Date();

    expDate.setDate(expDate.getDate()+7);

    try {
      sendContactFeedback({
        to: email,
        fullname: fullname,
        cupoon: otp,
        expryDate: expDate,
      });
      contact.save().then(() => {
        res.status(200).json({
          status: true,
          alert: {
            title: "Success!!",
            text: "We got your contact form",
            icon: "success",
            confirmButtonText: "OK!",
          },
        });
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        data: error,
        alert: {
          title: "Error!!",
          text: "Server Side Error Occured",
          icon: "error",
          confirmButtonText: "Wait!!",
        },
      });
    }
  });
});

export default router;
