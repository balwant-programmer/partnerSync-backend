import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // Your Gmail address
    pass: process.env.MAIL_PASS, // Your App Password
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"MarketList Manager" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error; // Rethrow error to be caught in the controller
  }
};

export default sendEmail;
