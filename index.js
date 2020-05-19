const multer = require("multer");
const express = require("express");
const app = express();

const uploadfilecontroller = require("./controller/apiUploadFile");
const totalvoilationscontroller = require("./controller/totalVoilationsMail");
const speedviolationscontroller = require("./controller/speedVoilationsMail");
const stopviolationscontroller = require("./controller/stopVoilationsMail");
const routeviolationscontroller = require("./controller/routeVoilationsMail");

global.__basedir = __dirname;



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
app.post('/api/uploadfile', upload.single("uploadfile"), uploadfilecontroller.apiuploadfile);

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
app.get("/totalviolations", totalvoilationscontroller.totalvoilations);

//speed violations
app.get("/speedviolations", speedviolationscontroller.speedvoilations);

//stoppage violations
app.get("/stopviolations", stopviolationscontroller.stopvoilations);

//route violations
app.get("/routeviolations", routeviolationscontroller.stopvoilations);


// Create a Server
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
