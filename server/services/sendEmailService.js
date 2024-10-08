import nodemailer from "nodemailer";
import APIError from "../exception/errorHandler.js";

//#region Send Email to User Service
export const sendEmailService = async (to, subject, text, html) => {
  try {
    console.log("Sending Email");

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com", // Replace with your SMTP server host
      port: 587, // Replace with your SMTP server port
      secure: false, // Set to true if using port 465, false for other ports
      auth: {
        user: "socialbuzztechnologies@gmail.com", // Replace with your SMTP username
        pass: "", // Replace with your SMTP password
      },
    });

    // Set up email data
    let mailOptions = {
      from: '"Sender Name" <socialbuzztechnologies@gmail.com>', // Replace with your sender address
      to: to, // Recipient address
      subject: subject, // Subject line
      text: text, // Plain text body
      html: html, // HTML body
    };

    // Send mail
    const response = await transporter.sendMail(mailOptions);

    console.log(response);

    // Resolve Promise
    return Promise.resolve("Email sent successfully");
  } catch (err) {
    throw new APIError(err.name, err.httpCode, err.isOperational, err.message);
  }
};