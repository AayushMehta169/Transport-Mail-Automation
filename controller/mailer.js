var transporter = require("../config/emailConfig");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();

module.exports.mailer = async (no, emails, type, cc) => {
  var loc;
  var name;
  var TDGViolationfile = "TDG violation letter.pdf";
  var routeViolationfile = "route violation letter.pdf";
  var speedviolationfile = "speed violation letter.pdf";
  var stoppageviolationfile = "stoppage violation letter.pdf";
  var routeViolationattach = {
    filename: routeViolationfile,
    path: "./public/attachment/" + routeViolationfile,
  };
  var speedViolationattach = {
    filename: speedviolationfile,
    path: "./public/attachment/" + speedviolationfile,
  };
  var stoppageViolationattach = {
    filename: stoppageviolationfile,
    path: "./public/attachment/" + stoppageviolationfile,
  };
  var TDGViolationattach = {
    filename: TDGViolationfile,
    path: "./public/attachment/" + TDGViolationfile,
  };

  for (i in emails) {
    let attach = [];
    if (emails[i].NO_OF_ROUTE_VOILATIONS > 0) {
      attach.push(routeViolationattach);
    }
    if (emails[i].NO_OF_SPEED_VOILATIONS > 0) {
      attach.push(speedViolationattach);
    }
    if (emails[i].NO_OF_STOPPAGE_VOILATIONS > 0) {
      attach.push(stoppageViolationattach);
    }
    if (attach.length >= 2) {
      attach.push(TDGViolationattach);
    }
    if (type === 4) {
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        cc: cc,
        subject: "Violation", // Subject line
        html:
          "<style>th, td {padding: 15px;border: 1px solid black;}</style><p>Dear Sir,</p><p> This is with regards to the Transport agreement that was entered into by <b>"+emails[i].TRANSPORTER_NAME  +"</b> and our Corporation for transportation of Bulk Petroleum Products from Chennai New Terminal ,Ennore to various retail outlets/customers.</p><p> The following email is to inform you that your Tank Truck number <strong>" +
          emails[i].TANK_TRUCK_NUMBER +
          "</strong> as observed from the VTS report has caused Route violations, Speed violations and Stoppage violations in the period: <b>"+ emails[i].FROM_DATE +"</b> to <b>"+ emails[i].TO_DATE +"</b> with regard to the agreed Terms and Conditions of the Transport Agreement and applicable Industry Transport Discipline Guidelines.</p><table style='border: 1px solid black;'> <tr> <th>Sr no</th> <th>TDG violation</th> <th>No. of times</th> </tr><tr> <td>1</td><td>Route violations</td><td>" +
          emails[i].NO_OF_ROUTE_VOILATIONS +
          "</td></tr><tr> <td>2</td><td>Stoppage violations</td><td>" +
          emails[i].NO_OF_STOPPAGE_VOILATIONS +
          "</td></tr><tr> <td>3</td><td>Speed violations</td><td>" +
          emails[i].NO_OF_SPEED_VOILATIONS +
          "</td></tr></table><p> Please refer to the following letter(s) for violations attached herewith.</p><p> Note : Tampering of VTS MU will result in termination of transportation contract on Industry basis.</p><p>Date: <b>"+ datetime +"</b> </p><p>With Regards,</p><p>Vikas Gupta</p><p>Vikas Gupta</p><p>HPCL, Chennai New Terminal</p>",

        //  "<b>Violation" +
        //   "<br>" +
        //   emails[i].NO_OF_STOPPAGE_VOILATIONS +
        //   "<br>" +
        //   emails[i].NO_OF_SPEED_VOILATIONS +
        //   "<br>" +
        //   emails[i].NO_OF_ROUTE_VOILATIONS +
        //   "<br>" +
        //   emails[i].TANK_TRUCK_NUMBER +
        //   "</b>", // html body

        attachments: attach,
        dsn: {
          id: "123",
          return: "headers",
          notify: ["failure", "delay"],
          recipient: "example@yo.com",
        },
      });
      console.log(emails[i].EMAIL);
      console.log("Message sent: %s", info.messageId);
    }

    // Mailing Script ends here ------------------------------
    // Below functions are for future purpose ------------------

    if (type === 1) {
      let info = await transporter.sendMail(
        {
          from: '"yoman" <example@yo.com>', // sender address
          to: emails[i].EMAIL, // list of receivers
          subject: "Route Violation", // Subject line
          text: "Route Violation", // plain text body
          html: "<b>Route Violation?</b>", // html body
          attachments: [
            {
              filename: "Route Violation.docx",
              path: "./public/attachments/route_violation.docx",
            },
          ],
          dsn: {
            id: "123",
            return: "headers",
            notify: ["failure", "delay"],
            recipient: "",
          },
        },
        (error, result) => {
          if (error) return console.error(error);
          return console.log(result);
        }
      );
      console.log(emails[i].EMAIL);
      console.log("Message sent: %s", info.messageId);
    }

    if (type === 2) {
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        subject: "Speed Violation", // Subject line
        text: "Speed Violation", // plain text body
        html: "<b>Speed Violation?</b>", // html body
        attachments: [
          {
            filename: "Speed Violation.docx",
            path: "./public/attachments/Speed_violation.docx",
          },
        ],
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

    if (type === 3) {
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        subject: "Stoppage Violation", // Subject line
        text: "Stoppage Violation", // plain text body
        html: "<b>Stoppage Violation?</b>", // html body
        attachments: [
          {
            filename: "Stoppage Violation.docx",
            path: "./public/attachments/Stoppage_violation.docx",
          },
        ],
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
  }
  console.log("All Mails Sent!!");
};
