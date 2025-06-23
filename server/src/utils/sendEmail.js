const transporter = require('./mailer');

const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;