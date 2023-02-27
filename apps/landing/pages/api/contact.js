import nodemailer from 'nodemailer';
import { mailTemplate } from 'utils';

export default function (req, res) {
  const template = req.body.template;
  const language = req.body.locale;

  const mailTranslations = require(`../../src/languages/${language}`).default
    .email;

  const transporter = nodemailer.createTransport({
    port: 587,
    host: 'smtp.neoco.dev',
    auth: {
      user: 'info@neoco.dev',
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: false,
    tls: { rejectUnauthorized: false },
  });

  transporter.sendMail(
    mailTemplate(req, mailTranslations, template),
    function (err, info) {
      if (err) console.log(err);
      else console.log(info);
      res.json({ info, err });
    },
  );
}
