const nodemailer = require("nodemailer");

exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randomVal = Math.round(Math.random() * 9);
    otp = otp + randomVal;
  }
  return otp;
};

exports.mailTransport = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "c774d0bc80ad5f",
      pass: "35d58bdac36d0e",
    },
  });
