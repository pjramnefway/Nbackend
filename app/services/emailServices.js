const { Resend } = require('resend');
require('dotenv').config();
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmailOtp = async (email, otp) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <your@resend.dev>',
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    if (error) {
      console.error('❌ Resend Error:', error);
      return;
    }

    console.log('✅ Email sent:', data);
  } catch (err) {
    console.error('❌ Resend Exception:', err.message);
  }
};

module.exports = { sendEmailOtp };

































/* const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,       // Your Gmail ID (example@gmail.com)
    pass: process.env.EMAIL_PWD       // App password
  },
});

const sendEmailOtp = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: 'Your Email OTP',
    html: `<p>Your OTP is: <strong>${otp}</strong></p>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailOtp }; */
