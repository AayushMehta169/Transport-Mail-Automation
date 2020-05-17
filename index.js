let connection = require("./config/config");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const readXlsxFile = require("read-excel-file/node");
const app = express();
let transporter = require("./config/emailConfig");

global.__basedir = __dirname;

const date = new Date();
const datetime = date.getDate()+" "+date.getMonth()+" "+date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// -> Express Upload RestAPIs
app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
  importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);

  // -> Import`'+ datetime +'`Excel Data to MySQL database
function importExcelData2MySQL(filePath){
  // File path.
  readXlsxFile(filePath).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    console.log(rows);
    // Remove Header ROW
    rows.shift();
	// MySQL data insert using previous connection
	  let queryinit= 'CREATE TABLE `'+ datetime +'` (ZONE varchar(255),LOCATION_CODE varchar(255),TANK_TRUCK_NUMBER varchar(255),TRANSPORTER_CODE varchar(255),TRANSPORTER_NAME varchar(255),TOTAL_NO_OF_TRIPS varchar(255),TOTAL_TRIPS_WITH_VOILATION varchar(255),NO_OF_SPEED_VOILATIONS varchar(255),NO_OF_STOPPAGE_VOILATIONS varchar(255),NO_OF_ROUTE_VOILATIONS varchar(255),FROM_DATE varchar(255),TO_DATE varchar(255));';
        connection.query(queryinit,(error, response) => {
			if(error){
        console.log(error);}
        });
        let query = 'INSERT INTO `'+ datetime +'` (`ZONE`, `LOCATION_CODE`, `TANK_TRUCK_NUMBER`, `TRANSPORTER_CODE`, `TRANSPORTER_NAME`, `TOTAL_NO_OF_TRIPS`, `TOTAL_TRIPS_WITH_VOILATION`, `NO_OF_SPEED_VOILATIONS`, `NO_OF_STOPPAGE_VOILATIONS`, `NO_OF_ROUTE_VOILATIONS`, `FROM_DATE`, `TO_DATE`) VALUES ?';
        connection.query(query, [rows], (error, response) => {
			if(error){
        console.log(error);}
        });
  })
}

    
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file, 'Date Uploaded':datetime
      });
});
 

 
/* SQL BEGINS */

/* SQL BEGINS */

//Data Variables
let totv = [];
let speedv = [];
let stoppagev = [];
let routev = [];

//Data Functions
function totalv(value) {
  totv = value;
  for (i in totv) {
    console.log(totv[i].EMAIL);
  }
}
function speedviol(value) {
  speedv = value;
  for (i in speedv) {
    console.log(speedv[i].EMAIL);
  }
}
function stoppageviol(value) {
  stoppagev = value;
  for (i in stoppagev) {
    console.log(stoppagev[i].EMAIL);
  }
}
function routeviol(value) {
  routev = value;
  for (i in routev) {
    console.log(routev[i].EMAIL);
  }
}

/* //upload email data
app.get('/upload', (req, res) => {
  let det = {TRANSPORTER_CODE:"111", EMAIL:"sample1@example.com"};
  let sql = 'INSERT INTO emaildetails SET ?';
  let query = db.query(sql, det,  (err,result)=>{
      if(err) throw err;
      console.log(result);
      res.send('Details added');
  });
}); */

//total violations
app.get("/totalviolations", (req, res) => {
  let sql ='SELECT emaildetails.EMAIL FROM `'+ datetime +'` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `'+ datetime +'`.TRANSPORTER_CODE WHERE `'+ datetime +'`.TOTAL_TRIPS_WITH_VOILATION>2;';
  let query = connection.query(sql, (err, emails) => {
    if (err) {
      throw err;
    } else {
      totalv(emails);
        var mailer = async (no, emails) => {
        var ar = emails;
        var arr = [];
        for (i in emails) {
          arr.push(ar[i].EMAIL);
        }
        for (i in arr){
        let info = await transporter.sendMail({
          from: '"yoman" <example@yo.com>', // sender address
          to: arr[i], // list of receivers
          subject: "Hello", // Subject line
          text: "Hello world", // plain text body
          html: "<b>Hello world?</b>", // html body
          
        });
        console.log(arr[i]);
        console.log("Message sent: %s", info.messageId);
        }
        console.log("All Mail Sent!!");
        res.send(emails);
      };
      mailer(emails.length, emails);
    }
  });
});

//speed violations
app.get("/speedviolations", (req, res) => {
  let sql ='SELECT emaildetails.EMAIL FROM `'+ datetime +'` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `'+ datetime +'`.TRANSPORTER_CODE WHERE `'+ datetime +'`.NO_OF_SPEED_VOILATIONS>0;';
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    speedviol(result);
    mailer(result.length, result);
  });
});

//stoppage violations
app.get("/stopviolations", (req, res) => {
  let sql ='SELECT emaildetails.EMAIL FROM `'+ datetime +'` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `'+ datetime +'`.TRANSPORTER_CODE WHERE `'+ datetime +'`.NO_OF_STOPPAGE_VOILATIONS>0;';
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    stoppageviol(result);
    mailer(result.length, result);
  });
});

//route violations
app.get("/routeviolations", (req, res) => {
  let sql ='SELECT emaildetails.EMAIL FROM `'+ datetime +'` INNER JOIN emaildetails ON emaildetails.TRANSPORTER_CODE = `'+ datetime +'`.TRANSPORTER_CODE WHERE `'+ datetime +'`.NO_OF_ROUTE_VOILATIONS>0;';
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    routeviol(result);
    mailer(result.length, result);
  });
});

/* SQL ENDS */



// Create a Server
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
