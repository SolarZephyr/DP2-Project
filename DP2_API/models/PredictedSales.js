var db = require('../dbconnection'); //reference of dbconnection.js  
var PredictedSales = {  
    getPredictedSales: function(sort, callback) {  
        return db.query("select * from PredictedSales order by sort=?", [sort], callback);  
    }
};  
module.exports = PredictedSales; 