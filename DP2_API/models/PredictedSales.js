var db = require('../dbconnection'); //reference of dbconnection.js  
var PredictedSales = {  
    getPredictedSalesSortById: function(callback) {  
        return db.query("select * from PredictedSales order by id", callback);  
    },
    getPredictedSalesSortByType : function(callback) {
        return db.query ("select *  from PredictedSales group by type order by type");
    },
    getPredictedSalesSortByPrice : function(callback) {
        return db.query ("select *  from PredictedSales order by price");
    }
};  
module.exports = PredictedSales; 