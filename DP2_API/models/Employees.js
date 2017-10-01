var db = require('../dbconnection.js'); //reference of dbconnection.js
var Employees = {  
    getAllEmployees: function(callback) {  
        return db.query("Select * from Employee", callback);  
    },  
    getEmployeesById: function(id, callback) {  
        return db.query("select * from Employee where Id = ?", [id], callback);  
    },  
    updateEmployees: function(id, Product, callback) {  
        return db.query("update product set firstname = ?,lastname = ? where id=?", [Employee.FirstName, Employee.LastName, id], callback);  
    },  
};  
module.exports = Employees;  