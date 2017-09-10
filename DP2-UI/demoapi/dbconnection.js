var mysql = require('mysql');  
var connection = mysql.createPool({  
    host: 'localhost',  
    user: 'root',  
    password: 'admin',  
    database: 'dev2'  
});  
module.exports = connection; 