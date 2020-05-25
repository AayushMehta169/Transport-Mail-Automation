let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  // host: "smtp.ethereal.email",
  // port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: "akshatgarimaya@gmail.com",
    pass: "akshatkhanna",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
