const connection = require("../config/config");
 


  module.exports.previousTable = function (req, res) {
  var fs = require('fs');
var array = fs.readFileSync('logging.txt').toString().split("\n");
var datetime = array[array.length - 2];
    let sql =
      "SELECT * FROM `" +
      datetime +
      "`;";
    let query = connection.query(sql, (err, emails) => {
      if (err)   
      res.render('error.ejs');
      
      else{
        
            res.render('previous.ejs', { details: emails, date: datetime });  
      }
      
    });
  };
  