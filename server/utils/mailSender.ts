import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const mailSender = async (email: String, title: String, body: String) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"FlipTrack" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export { mailSender };
