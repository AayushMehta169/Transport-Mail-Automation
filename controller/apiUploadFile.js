const connection = require("../config/config");
const fs = require("fs");
const XLSX = require("xlsx");

const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

module.exports.apiuploadfile = function (req, res) {
  importExcelData2MySQL(__basedir + "/uploads/" + req.file.filename);

  // -> Import`'+ datetime +'`Excel Data to MySQL database
  function importExcelData2MySQL(filePath) {
    let flag = 0;
    // File path.
    var excelfile = XLSX.readFile(filePath);
    // `rows` is an array of rows
    // each row being an array of cells.
    let rows = XLSX.utils.sheet_to_json(
      excelfile.Sheets["TDG VIOLATION REPORT"],
      { header: 1 }
    );
    // Remove Header ROW
    rows.shift();
    rows.shift();
    rows.shift();

    rows = rows.filter(function (value, index, arr) {
      return value.length === 13;
    });
    // check if table already exist
    let query2 = "DROP TABLE IF EXISTS `" + datetime + "`";
    connection.query(query2, [rows], (error, response) => {
      if (error) {
        flag += 1;
        console.log(error);
      }
    });

    // MySQL data insert using previous connection
    let queryinit =
      "CREATE TABLE `" +
      datetime +
      "` (ZONE varchar(255),LOCATION_CODE varchar(255),LOCATION_NAME varchar(255),TANK_TRUCK_NUMBER varchar(255),TRANSPORTER_CODE varchar(255),TRANSPORTER_NAME varchar(255),TOTAL_NO_OF_TRIPS varchar(255),TOTAL_TRIPS_WITH_VOILATION varchar(255),NO_OF_SPEED_VOILATIONS varchar(255),NO_OF_STOPPAGE_VOILATIONS varchar(255),NO_OF_ROUTE_VOILATIONS varchar(255),FROM_DATE varchar(255),TO_DATE varchar(255));";
    connection.query(queryinit, (error, response) => {
      if (error) {
        flag += 1;
        console.log(error);
      } else {
        let query =
          "INSERT INTO `" +
          datetime +
          "` (`ZONE`, `LOCATION_CODE`, `LOCATION_NAME` ,`TANK_TRUCK_NUMBER`, `TRANSPORTER_CODE`, `TRANSPORTER_NAME`, `TOTAL_NO_OF_TRIPS`, `TOTAL_TRIPS_WITH_VOILATION`, `NO_OF_SPEED_VOILATIONS`, `NO_OF_STOPPAGE_VOILATIONS`, `NO_OF_ROUTE_VOILATIONS`, `FROM_DATE`, `TO_DATE`) VALUES ?";
        connection.query(query, [rows], (error, response) => {
          if (error) {
            flag += 1;
            console.log(error);
          }
        });
      }
      if (flag > 0) {
        res.render("", {
          status: {
            msg: "File upload/import Failed!",
          },
        });
      } else if (flag == 0) {
        res.render("sendemail.ejs", {
          status: {
            msg: "File uploaded/import successfully!",
            file: req.file,
            "Date Uploaded": datetime,
            TotalRows: rows.length,
          },
        });
      }
    });
  }
};
