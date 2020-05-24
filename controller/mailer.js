var transporter = require("../config/emailConfig");

module.exports.mailer = async (no, emails, type) => {
  var loc;
  var name;
  let TDGViolationfile = "TDG_Violations.docx";
  let routeViolationfile = "route_violation.docx";
  let speedviolationfile = "Speed_violation.docx";
  let stoppageviolationfile = "Stoppage_violation.docx";

  let routeViolationattach = {filename:routeViolationfile,path:"./public/attachment/" + routeViolationfile,};
  let speedViolationattach = {filename:speedviolationfile,path:"./public/attachment/" + speedviolationfile,};
  let stoppageViolationattach = {filename:stoppageviolationfile,path:"./public/attachment/" + stoppageviolationfile,};

  for (i in emails) {
    let attach = [];
    if(emails[i].NO_OF_ROUTE_VOILATIONS>0){attach.push(routeViolationattach)};
    if(emails[i].NO_OF_SPEED_VOILATIONS>0){attach.push(speedViolationattach)};
    if(emails[i].NO_OF_STOPPAGE_VOILATIONS>0){attach.push(stoppageViolationattach)};
    console.log(attach);
    if(type === 4){
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        subject: "Violation", // Subject line
        html: "<b>Violation"+"<br>"+emails[i].NO_OF_STOPPAGE_VOILATIONS+"<br>"+emails[i].NO_OF_SPEED_VOILATIONS
        +"<br>"+emails[i].NO_OF_ROUTE_VOILATIONS+"<br>"+emails[i].TANK_TRUCK_NUMBER+"</b>", // html body

        attachments:attach,
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

    if(type === 1){
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        subject: "Route Violation", // Subject line
        text: "Route Violation", // plain text body
        html: "<b>Route Violation?</b>", // html body
        attachments: [
          {
            filename:"Route Violation.docx",
            path:"./public/attachments/route_violation.docx",
          },
        ],
        dsn: {
          id: "123",
          return: "headers",
          notify: ["failure", "delay"],
          recipient: "",
        },
      }, (error, result) => {
        if (error) return console.error(error);
        return console.log(result);
      });
      console.log(emails[i].EMAIL);
      console.log("Message sent: %s", info.messageId);
    }
    
    if(type === 2){
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        subject: "Speed Violation", // Subject line
        text: "Speed Violation", // plain text body
        html: "<b>Speed Violation?</b>", // html body
        attachments: [
          {
            filename:"Speed Violation.docx",
            path:"./public/attachments/Speed_violation.docx",
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

    if(type === 3){
      let info = await transporter.sendMail({
        from: '"yoman" <example@yo.com>', // sender address
        to: emails[i].EMAIL, // list of receivers
        subject: "Stoppage Violation", // Subject line
        text: "Stoppage Violation", // plain text body
        html: "<b>Stoppage Violation?</b>", // html body
        attachments: [
          {
            filename:"Stoppage Violation.docx",
            path:"./public/attachments/Stoppage_violation.docx",
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
