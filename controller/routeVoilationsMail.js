const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let routev = [];

function routeviol(value) {
  routev = value;
  for (i in routev) {
    console.log(routev[i].EMAIL);
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
    "`.NO_OF_ROUTE_VOILATIONS>0;";
  let query = connection.query(sql, (err, emails) => {
    if (err) throw err;
    routeviol(emails);
    var type = 1;
    mailer(emails.length, emails, type);
  });
};
