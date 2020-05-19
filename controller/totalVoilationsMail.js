const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");


const date = new Date();
const datetime = date.getDate()+" "+date.getMonth()+" "+date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let totv = [];

function totalv(value) {
    totv = value;
    for (i in totv) {
      console.log(totv[i].EMAIL);
    }
  }

module.exports.totalvoilations=function(req, res) {
    let sql ='SELECT emaildetails.EMAIL FROM `'+ datetime +'` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `'+ datetime +'`.TRANSPORTER_CODE WHERE `'+ datetime +'`.TOTAL_TRIPS_WITH_VOILATION>2;';
    let query = connection.query(sql, (err, emails) => {
      if (err) {
        throw err;
      } else {
        totalv(emails);
          let mailer = async (no, emails) => {
          for (i in emails){
          let info = await transporter.sendMail({
            from: '"yoman" <example@yo.com>', // sender address
            to: emails[i].EMAIL, // list of receivers
            subject: "Hello", // Subject line
            text: "Hello world", // plain text body
            html: "<b>Hello world?</b>", // html body
            
          });
          console.log(emails[i].EMAIL);
          console.log("Message sent: %s", info.messageId);
          }
          console.log("All Mails Sent!!");
          res.send(emails);
        };
        mailer(emails.length, emails);
      }
    });
  }