var db = require('../dbconnection.js'); //reference of dbconnection.js
var Employees = {  
    getAllEmployees: function(callback) {  
        return db.query("Select * from Employee", callback);  
    },  
    getEmployeesById: function(id, callback) {  
        return db.query("select * from Employee where Id = ?", [id], callback);  
    },  
	addEmployee: function(Employee, callback) {  
        return db.query("Insert into Employee (firstname, lastname) values(?,?)", [Employee.FirstName, Employee.LastName], callback);  
	},
    updateEmployees: function(id, Employee, callback) {  
        return db.query("update Employee set firstname = ?,lastname = ? where id=?", [Employee.FirstName, Employee.LastName, id], callback);  
    },  
};  
module.exports = Employees;  