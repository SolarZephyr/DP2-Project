var db = require('../dbconnection'); //reference of dbconnection.js  
var Transactions = {  
    getAllTransactions: function(skip, take, callback) {  
        return db.query("CALL `mydb`.`getAllTransactions`(?,?)", [skip, take], callback);  
    },  
    newTransaction: function(transaction, callback) {  
        return db.query("CALL `mydb`.`newTransaction`(?)", [transaction.EmployeeID], callback);  
    },
    maxTransaction: function(callback){
        return db.query("CALL `mydb`.`maxTransaction`()", callback);
    },
    countTransaction: function(callback){
        return db.query("CALL `mydb`.`countTransaction`()", callback);
    },
    updateTransactionStatus: function(id,status,callback){
        return db.query("CALL `mydb`.`UpdateTransactionStatus`(?,?)", [id, status], callback);
    },
};  
module.exports = Transactions; 