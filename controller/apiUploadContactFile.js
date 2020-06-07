const connection = require("../config/config");
const fs = require("fs");
const XLSX = require("xlsx");


module.exports.apiuploadcontactfile=function(req, res){
    importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
  
    // -> Import`'+ datetime +'`Excel Data to MySQL database
  function importExcelData2MySQL(filePath){
    var flag = 0;
    // File path.
    var excelfile = XLSX.readFile(filePath);
      // `rows` is an array of rows
      // each row being an array of cells.
      let rows =  XLSX.utils.sheet_to_json(excelfile.Sheets['Sheet1'], {header:1});
      // Remove Header ROW
      rows.shift();
      for (i in rows){
        rows[i][6] = null;
        rows[i][7] = null;
        rows[i][8] = null;
        rows[i][12] = null;
      }
      rows = rows.filter(function(value, index, arr){ return value.length === 13;});
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
          let queryinit= "CREATE TABLE `emaildetails` (id int,TANK_TRUCK_NUMBER varchar(255),Carrier_No varchar(255),Carrier_Name varchar(255),Type_of_TT varchar(255),Capacity_KL varchar(255),Address1 varchar(255),Address2 varchar(255),Address3 varchar(255),Phone_No varchar(255),Phone_No_2 varchar(255) NULL,EMAIL varchar(255),Agreement_dt varchar(255),PRIMARY KEY (TANK_TRUCK_NUMBER));";
            connection.query(queryinit,(error, response) => {
              if(error){
                flag+=1;
                console.log(error);
                }
                else {
                  let query = "INSERT INTO `emaildetails` (`id`,`TANK_TRUCK_NUMBER`,`Carrier_No`, `Carrier_Name`, `Type_of_TT` ,`Capacity_KL`,`Address1`,`Address2`,`Address3` ,`Phone_No`, `Phone_No_2`, `EMAIL`, `Agreement_dt`) VALUES ?";
                connection.query(query, [rows], (error, response) => {
                  if(error){
                    flag+=1;
                    console.log(error);
                  }
                  });
                }
            });
            if(flag>0){
              res.render("updatecontact.ejs" ,{
                status: {
                  'msg': 'File upload/import Failed!', 
                }
              })
            }
            else if(flag==0){
              res.render("updatecontact.ejs",{
                status: {
                  'msg': 'Contacts uploaded/import successfully!', 
                  'file': req.file,  
                  'TotalRows':rows.length,
                }
              })
            }
  }      
    
  }