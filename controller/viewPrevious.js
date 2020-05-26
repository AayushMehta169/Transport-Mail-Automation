const connection = require("../config/config");
const date = new Date();
const datetime =
  date.getDate() + " " + date.getMonth() + " " + date.getFullYear();

  module.exports.previousTable = function (req, res) {
    let sql =
      "SELECT * FROM `" +
      datetime +
      "`;";
    let query = connection.query(sql, (err, emails) => {
      if (err) 
      throw err;
      else{
        
            res.render('previous.ejs', { details: emails });  
      }
      
    });
  };
  