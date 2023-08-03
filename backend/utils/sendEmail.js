const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const transporter = require('../helpers/emailTransport');
const fileURLToPath = require('url').fileURLToPath;

// __filename = fileURLToPath(import.meta.url);
// __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
  try {
    const sourceDirectory = fs.readFileSync(
      path.join(__dirname, template),
      'utf8'
    );

    const compiledTemplate = handlebars.compile(sourceDirectory);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
    await transporter.sendMail(emailOptions);
  } catch (error) {
    systemLogs.error(`Email not sent: ${error}`);
  }
};

module.exports = sendEmail;
