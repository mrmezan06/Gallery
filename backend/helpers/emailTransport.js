const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

let transporter;

if (process.env.NODE_ENV === 'Development') {
  transporter = nodemailer.createTransport({
    host: '192.168.0.111',
    port: 1025,
  });
} else if (process.env.NODE_ENV === 'Production') {
  // TODO: Add production email transport
  /* const mailgunAuth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };
  transporter = nodemailer.createTransport(mg(mailgunAuth)); */
}

module.exports = transporter;
