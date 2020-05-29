const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");
const mailer = require("./mailer");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let totv = [];

function totalv(value) {
  totv = value;
  for (i in totv) {
    console.log(totv[i].EMAIL);
  }
}

module.exports.totalvoilations = function (req, res) {
  let sql =
    "SELECT emaildetails.EMAIL,`" +
    datetime +
    "`.NO_OF_STOPPAGE_VOILATIONS,`" +
    datetime +
    "`.NO_OF_SPEED_VOILATIONS,`" +
    datetime +
    "`.NO_OF_ROUTE_VOILATIONS,`" +
    datetime +
    "`.TANK_TRUCK_NUMBER FROM `" +
    datetime +
    "` INNER JOIN emaildetails ON emaildetails.TANK_TRUCK_NUMBER = `" +
    datetime +
    "`.TANK_TRUCK_NUMBER WHERE `" +
    datetime +
    "`.TOTAL_TRIPS_WITH_VOILATION>0;";
  let query = connection.query(sql, async (err, emails) => {
    if (err) {
      console.log(err);
    } else {
      totalv(emails);
      var type = 4;
      await mailer.mailer(emails.length, emails, type);
      fs.appendFile("logging.txt", datetime + "\n", function (err) {
        if (err) throw err;
        console.log("Saved!"); 
      });
      // res.send(emails);
      res.render("feedback.ejs", { feeds: emails, type: "Total Violation" });
    }
  });
};
