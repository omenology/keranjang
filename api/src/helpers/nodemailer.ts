import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { HOST_SMTP, PORT_SMTP } from "./constant";

export const trnsportMail = nodemailer.createTransport({
  host: HOST_SMTP,
  port: PORT_SMTP as number,
  secure: false,
  auth: {
    user: "xo4stlwaevociboe@ethereal.email",
    pass: "RyHSa1RQdqd51x8NTH",
  },
});

export const sendMail = (to: string, text: string) => {
  return trnsportMail.sendMail({
    from: '"Fred Foo 👻" <xo4stlwaevociboe@ethereal.email>',
    to,
    subject: "Hello ✔",
    text,
    html: "<b>Hello world?</b>",
  });
};
