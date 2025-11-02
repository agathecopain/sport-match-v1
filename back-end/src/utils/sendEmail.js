import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: { user: process.env.BREVO_USER, pass: process.env.SMTP_KEY },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed", error);
  } else {
    console.log("SMTP connection OK", success);
  }
});

export default async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"Sport Match" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("Email envoyé : ", info.messageId);
  } catch (error) {
    console.error("Erreur envoi email : ", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
}
