var db = require('../dbconnection.js'); //reference of dbconnection.js
var Employees = {  
    getAllEmployees: function(callback) {  
        return db.query("CALL `mydb`.`GetAllEmployees`()", callback);  
    },  
    getEmployeesById: function(id, callback) {  
        return db.query("CALL `mydb`.`GetEmployeesById`(?)", [id], callback);  
    },  
	addEmployee: function(Employee, callback) {  
        return db.query("CALL `mydb`.`addEmployee`(?,?)", [Employee.FirstName, Employee.LastName], callback);  
	},
    updateEmployees: function(id, Employee, callback) {  
        return db.query("CALL `mydb`.`UpdateEmployees`(?,?,?)", [id], Employee.FirstName, Employee.LastName, callback);  
    },  
};  
module.exports = Employees;  