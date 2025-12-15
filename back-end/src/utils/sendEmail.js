import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import "dotenv/config";

export default async function sendEmail({ to, subject, html }) {
  try {
    let emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.SMTP_API_KEY;

    let message = new SendSmtpEmail();
    message.subject = subject;
    message.htmlContent = html;
    message.sender = {
      name: "Sport Match",
      email: process.env.GMAIL_USER,
    };
    message.to = [
      {
        email: to,
        name: to,
      },
    ];

    await emailAPI.sendTransacEmail(message).then((resAPI) => {
      console.log(JSON.stringify(resAPI.body));
      return resAPI;
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}
