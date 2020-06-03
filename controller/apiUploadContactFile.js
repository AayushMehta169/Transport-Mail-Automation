const connection = require("../config/config");
const fs = require("fs");
const XLSX = require("xlsx");


module.exports.apiuploadcontactfile=function(req, res){
    importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
  
    // -> Import`'+ datetime +'`Excel Data to MySQL database
  function importExcelData2MySQL(filePath){
    let flag = 0;
    // File path.
    var excelfile = XLSX.readFile(filePath);
      // `rows` is an array of rows
      // each row being an array of cells.
      let rows =  XLSX.utils.sheet_to_json(excelfile.Sheets['Sheet1'], {header:1});
      // Remove Header ROW
      rows.shift();
        console.log(rows);
      // check if table already exist
      let query2 = 'DROP TABLE IF EXISTS `emaildetails`';
      connection.query(query2, [rows], (error, response) => {
        if(error){
          flag+=1;
          console.log(error);
        }
        });

      // MySQL data insert using previous connection
          let queryinit= "CREATE TABLE `emaildetails` (id int,Carrier_No varchar(255),Carrier_Name varchar(255),Type_of_TT varchar(255),Capacity_KL varchar(255),Phone_No varchar(255),Phone_No_2 varchar(255),EMAIL varchar(255),Agreement_dt varchar(255));";
            connection.query(queryinit,(error, response) => {
              if(error){
                flag+=1;
                console.log(error);
                }
                else {
                  let query = "INSERT INTO `emaildetails` (`id`,`Carrier_No`, `Carrier_Name`, `Type_of_TT` ,`Capacity_KL`, `Phone_No`, `Phone_No_2`, `EMAIL`, `Agreement_dt`) VALUES ?";
                connection.query(query, [rows], (error, response) => {
                  if(error){
                    flag+=1;
                    console.log(error);
                  }
                  });
                }
                if(flag>0){
                  res.send( {
                    status: {
                      'msg': 'File upload/import Failed!', 
                    }
                  })
                }
                else if(flag==0){
                  res.send({
                    status: {
                      'msg': 'File uploaded/import successfully!', 
                      'file': req.file,  
                      'TotalRows':rows.length,
                    }
                  })
                }
            });
  }      
    
  }