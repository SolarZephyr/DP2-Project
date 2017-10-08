var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: 'Password1234',  
    database: 'mydb'  
});  
module.exports = connection; 