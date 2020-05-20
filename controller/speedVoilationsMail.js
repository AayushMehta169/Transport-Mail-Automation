const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");
const mailer = require("./mailer");
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
    var type = 2;
    mailer(emails.length, emails, type);
  });
};
