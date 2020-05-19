const connection = require("../config/config");
const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");


const date = new Date();
const datetime = date.getDate()+" "+date.getMonth()+" "+date.getFullYear();
// +"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

module.exports.apiuploadfile=function(req, res){
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
  }