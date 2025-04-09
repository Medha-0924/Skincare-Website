const nodemailer = require('nodemailer');
const config = require('../config/appConfig.js');

const transporter = nodemailer.createTransport(config.email);

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTP = (email, otp) => {
  const mailOptions = {
    from: config.email.auth.user,
    to: email,
    subject: 'OTP for Verification',
    text: `Your OTP for verification is: ${otp}`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info);
      }
    });
  });
};

