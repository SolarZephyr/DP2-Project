var db = require('../dbconnection'); //reference of dbconnection.js  
var ProductInventory = {  
    getAllProducts: function(callback) {  
        return db.query("Select * from Product", callback);  
    }
};  
module.exports = ProductInventory; 