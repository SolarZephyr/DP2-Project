var db = require('../dbconnection'); //reference of dbconnection.js  
var Transactions = {  
    getAllTransactions: function(callback) {  
        return db.query("select * from transaction", callback);  
    },  
    newTransaction: function(transaction, callback) {  
        return db.query("Insert into transaction (EmployeeID, StatusID, Date) values(?,0,NOW())", [transaction.EmployeeID], callback);  
    },
    maxTransaction: function(callback){
        return db.query("SELECT DISTINCT MAX(ID) AS 'MAX_TRANSACTION' FROM TRANSACTION", callback);
    }
};  
module.exports = Transactions; 