var db = require('../dbconnection'); //reference of dbconnection.js  
var Sales = {  
    getSaleById: function(id, callback) {  
        return db.query("select * from sale where transactionid=?", [id], callback);  
    },  
    addSale: function(Sale, callback) {  
        return db.query("Insert into sale (transactionid, amt, unitprice, productid) values(?,?,?,?)", [Sale.TransID, Sale.AmtSold, Sale.UnitPrice, Sale.ProdID], callback);  
    }
};  
module.exports = Sales; 