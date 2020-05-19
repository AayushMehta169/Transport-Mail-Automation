const connection = require("../config/config");
const fs = require("fs");
const transporter = require("../config/emailConfig");

const date = new Date();
const datetime = date.getDate()+" "+date.getMonth()+" "+date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

let routev = [];

function routeviol(value) {
  routev = value;
  for (i in routev) {
    console.log(routev[i].EMAIL);
  }
}

module.exports.stopvoilations=function(req, res) {
    let sql ='SELECT emaildetails.EMAIL FROM `'+ datetime +'` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `'+ datetime +'`.TRANSPORTER_CODE WHERE `'+ datetime +'`.NO_OF_ROUTE_VOILATIONS>0;';
    let query = connection.query(sql, (err, emails) => {
      if (err) throw err;
      routeviol(emails);
      let mailer = async (no, emails) => {
        for (i in emails){
        let info = await transporter.sendMail({
          from: '"yoman" <example@yo.com>', // sender address
          to: emails[i].EMAIL, // list of receivers
          subject: "Hello4", // Subject line
          text: "Hello world4", // plain text body
          html: "<b>Hello world4?</b>", // html body
          
        });
        console.log(emails[i].EMAIL);
        console.log("Message sent: %s", info.messageId);
        }
        console.log("All Mails Sent!!");
        res.send(emails);
      };
      mailer(emails.length, emails);
    });
  }