const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");
const mailer = require("./mailer");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let stoppagev = [];

function stoppageviol(value) {
  stoppagev = value;
  for (i in stoppagev) {
    console.log(stoppagev[i].EMAIL);
  }
}

module.exports.stopvoilations = function (req, res) {
  let sql =
    "SELECT emaildetails.EMAIL FROM `" +
    datetime +
    "` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `" +
    datetime +
    "`.TRANSPORTER_CODE WHERE `" +
    datetime +
    "`.NO_OF_STOPPAGE_VOILATIONS>0;";
  let query = connection.query(sql, (err, emails) => {
    if (err) throw err;
    stoppageviol(emails);
    var type = 3;
    mailer.mailer(emails.length, emails, type);
    res.send(emails);
  });
};
