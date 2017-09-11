var db = require('../dbconnection'); //reference of dbconnection.js  
var Types = {  
    getAllTypes: function(callback) {  
        return db.query("select * from producttype", callback);  
    },  
    addType: function(Type, callback) {  
        return db.query("Insert into producttype (ID, Description) values(?,?)", [Type.ID, Type.Description], callback);  
    }
};  
module.exports = Types; 