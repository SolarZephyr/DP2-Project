var db = require('../dbconnection'); //reference of dbconnection.js  
var Types = {  
    getAllTypes: function(callback) {  
        return db.query("CALL `mydb`.`getAllTypes`()", callback);  
    },  
    addType: function(Type, callback) {  
        return db.query("CALL `mydb`.`addType`(?,?)", [Type.ID, Type.Description], callback);  
    }
};  
module.exports = Types; 