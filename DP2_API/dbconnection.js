var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: 'Password1234',  
    database: 'dp2_db'  
});  
module.exports = connection; 