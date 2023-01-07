import nodemailer from "nodemailer";
import { MAIL_SETTINGS } from "../constants/constants.js";

const transporter = nodemailer.createTransport(MAIL_SETTINGS);

export async function sendMail(params) {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Hello ✅",
      html: `
        <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>`,
    });
    return info;
  } catch (error) {
    
    return false;
  }
}

export async function sendUserEmail(params) {
  try {
    let mail = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Welcome ❤️",
      html: `
      <div style="max-width: 90%; margin: auto; padding-top: 20px;">
        <h2>Welcome to application.</h2>
        <h4>Get started with a small authentication 🎟️</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size:40px; letter-spacing: 2px ; text-align: center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
      `,
    });

    return mail;
  } catch (error) {
    
    return false;
  }
}

export async function sendUserLoginEmail(params) {
  try {
    let mail = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Welcome Back Again ❤️",
      html: `
      <div style="max-width: 90%; margin: auto; padding-top: 20px;">
        <h2>Welcome Back to application.</h2>
        <h4>Get started with a small authentication 🎟️</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size:40px; letter-spacing: 2px ; text-align: center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
      </div>
      `,
    });

    return mail;
  } catch (error) {
    
    return false;
  }
}

export async function sendContactFeedback(params) {
  try {
    let mail = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Thanks for your valuable feedback ❤️",
      html: `
    <div style="width: 100%; margin: 1rem;">
    <span style="font-weight: bold; font-size: 1.5rem; padding: 1rem;">Hello ${params.fullname}</span>
    <div style="padding: 1rem; font-size:1.2rem;">Thank you for your valuable feedback ❤️</div>
    <div style="padding:1rem; font-size: 1.2rem;">We are thrilled that the <span style="font-weight: bold; font-size: 1.3rem;">Bus Seva</span> helped you solve your problem. We take great pride in our work, and our sincerest hope is that it helps each one of our customers accomplish their goals. Your feedback has demonstrated that it does, and we appreciate you letting us know.</div>
    <div style="padding: 1rem; font-size:1.2rem;">To really show our appreciation, we’ve included the following coupon code: <span style="font-size: 1.3rem; font-weight: bold;">${params.cupoon}</span>. Please use it by <span style="font-size: 1.3rem; font-weight: bold;">${params.expryDate}</span> to enjoy more of our products or services at your convenience.</div>
    <div style="padding: 1rem; font-size:1.2rem;">We’d love to hear from you again! If you use our products or services in the future and would like to leave more feedback, please contact us anytime between the hours of 9AM-5PM, Monday-Friday.</div>
    <div style="padding: 1rem; font-size:1.2rem;">Have a wonderful day!</div>
    <div style="padding: 1rem; font-size: 1.1rem;">Kind regards, <span style="font-weight: bold; text-transform: uppercase;">Bus Seva</span></div>
    </div>
      `,
    });

    return mail;
  } catch (error) {
    return false;
  }
}

export async function sendBookingDetails(params) {
  try {
    let mail = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: `Booking Details 🚌`,
      html: `
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
      }
      .box {
        margin: 1rem;
        width: 100%;
      }
      .section1{
        margin: 1rem 0rem;
      }
      .section1 .head {
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: bold;
      }
      .message {
        color: gray;
      }
      .image {
        width: 60%;
      }

      .section2 .head{
        font-size: 1.2rem;
        font-weight: bold;
      }

      .section2 .details{
        margin: .75rem 0rem;
      }

      .section2 .details .data{
        font-size: 1.3rem;
        font-weight: 500;
      }

      .section2 .details .seats{
        font-size: 1.3rem;
        font-weight: 500;
      }

    </style>
    <div class="box">
      <div class="section1">
        <div class="head">Bus Seva</div>
        <span class="message">Your seats has been confirmed</span>
      </div>
      <div class="section2">
        <div class="head">Booking Details</div>
        <div class="details">
            Seat Booked : <span class="data">${params.seats.length}</span>
        </div>
        <div class="details">
            Seat Numbers : <span class="seats">${params.seats.join(", ")}</span>
        </div>
        
      </div>
    </div>
    <script type="text/javascript">
    </script>
      `,
    });
    return mail;
  } catch (err) {
    
    return false;
  }
}
