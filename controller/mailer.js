var transporter = require("../config/emailConfig");

module.exports.mailer = async (no, emails, type) => {
  var loc;
  var name;
  switch (type) {
    case 1:
      loc = "./public/attachments/route_violation.docx";
      name = "Route Violation.docx";
      break;
    case 2:
      loc = "./public/attachments/Speed_violation.docx";
      name = "Speed Violation.docx";
      break;
    case 3:
      loc = "./public/attachments/Stoppage_violation.docx";
      name = "Stoppage Violation.docx";
      break;
    case 4:
      loc = "./public/attachments/TDG_violation.docx";
      name = "TDG Violation.docx";
      break;
  }
  for (i in emails) {
    let info = await transporter.sendMail({
      from: '"yoman" <example@yo.com>', // sender address
      to: emails[i].EMAIL, // list of receivers
      subject: "Hello2", // Subject line
      text: "Hello world2", // plain text body
      html: "<b>Hello world2?</b>", // html body
      attachments: [
        {
          filename: name,
          path: loc,
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
  console.log("All Mails Sent!!");
  
};
