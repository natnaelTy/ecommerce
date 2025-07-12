// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS, // App password (not your real Gmail password)
    },
  });

  await transporter.sendMail({
    from: `"Messay fur" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
};

export const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const sendVerificationCode = async (email, code) => {

   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail
      pass: process.env.EMAIL_PASS, // App password (not your real Gmail password)
    },
  });

  const html = `
    <h2>Verify your Email</h2>
    <p>Your verification code is:</p>
    <h1 style="letter-spacing: 2px;">${code}</h1>
    <p>This code will expire in 10 minutes.</p>
  `;

  await transporter.sendMail({
    from: '"Messay Fur" <no-reply@dvorahub.com>',
    to: email,
    subject: "Your Email Verification Code",
    html,
  });
  };