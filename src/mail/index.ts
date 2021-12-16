import nodemailer from "nodemailer";
import { htmlToText } from "nodemailer-html-to-text";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "forinda82testing@gmail.com",
    pass: "dennisdennis20",
  },
});
transporter.use("compile", htmlToText());

const sendMail = async (mailOptions: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) => {
  transporter.sendMail({ ...mailOptions }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(data);
      return;
    }
  });
};

export default sendMail;
