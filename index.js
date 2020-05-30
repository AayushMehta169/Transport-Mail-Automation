const multer = require("multer");
const express = require("express");
const app = express();

var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var passport = require("passport");
var flash = require("connect-flash");

const uploadfilecontroller = require("./controller/apiUploadFile");


global.__basedir = __dirname;

//Login Middleware

require("./config/passport")(passport);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "justasecret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./app/routes")(app, passport);

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
app.post(
  "/api/uploadfile",
  upload.single("uploadfile"),
  uploadfilecontroller.apiuploadfile
);



// Create a Server
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;

  console.log("App listening at http://%s:%s", host, port);
});
