import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name}<${sender.email}>`,
    to: email,
    subject: "Welcome to Chattr!",
    html: createWelcomeEmailTemplate(name, clientUrl),
  });
  if (error) {
    console.error("Error sending welcome emaill: ", error);
    throw new Error("Error sending welcome email");
  }
  console.log("Sent welcome email", data);
};
