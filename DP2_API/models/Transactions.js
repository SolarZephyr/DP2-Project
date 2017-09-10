var db = require('../dbconnection'); //reference of dbconnection.js  
var Transactions = {  
    getAllTransactions: function(callback) {  
        return db.query("select * from transaction", callback);  
    },  
    addTransaction: function(Sale, callback) {  
        return db.query("Insert into sale (transactionid, amt, unitprice, productid) values(?,?,?,?)", [Sale.transactionid, Sale.amt, Sale.unitprice, Sale.productid], callback);  
    }
};  
module.exports = Transactions; 