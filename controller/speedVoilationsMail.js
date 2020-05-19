const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let speedv = [];

function speedviol(value) {
  speedv = value;
  for (i in speedv) {
    console.log(speedv[i].EMAIL);
  }
}

module.exports.speedvoilations = function (req, res) {
  let sql =
    "SELECT emaildetails.EMAIL FROM `" +
    datetime +
    "` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `" +
    datetime +
    "`.TRANSPORTER_CODE WHERE `" +
    datetime +
    "`.NO_OF_SPEED_VOILATIONS>0;";
  let query = connection.query(sql, (err, emails) => {
    if (err) throw err;
    speedviol(emails);
    let mailer = async (no, emails) => {
      for (i in emails) {
        let info = await transporter.sendMail({
          from: '"yoman" <example@yo.com>', // sender address
          to: emails[i].EMAIL, // list of receivers
          subject: "Hello2", // Subject line
          text: "Hello world2", // plain text body
          html: "<b>Hello world2?</b>", // html body
          dsn: {
            id: "123",
            return: "headers",
            notify: ["failure", "delay"],
            recipient: "",
          },
        });
        console.log(emails[i].EMAIL);
        console.log("Message sent: %s", info.messageId);
      }
      console.log("All Mails Sent!!");
      res.send(emails);
    };
    mailer(emails.length, emails);
  });
};
