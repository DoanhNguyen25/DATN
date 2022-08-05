const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "crishnguyen25@gmail.com",
    pass: "bksfpbtwiyeqschi",
  },
});

module.exports = {
  mailTransporter,
};
