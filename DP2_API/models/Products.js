var db = require('../dbconnection.js'); //reference of dbconnection.js  
var Products = {  
    getAllProducts: function(callback) {  
        return db.query("CALL `mydb`.`GetAllProducts`()", callback);  
    },
    getProductsPage: function(skip, take, callback) {  
        return db.query("CALL `mydb`.`getProductsPage`(?,?)", [skip, take], callback);  
    },  
    getProductById: function(id, callback) {  
        return db.query("CALL `mydb`.`getProductById`(?)", [id], callback);  
    },  
    addProduct: function(Product, callback) {  
        return db.query("CALL `mydb`.`addProduct`(?,?,?,?)", [Product.Name, Product.Type, Product.Price, Product.Stock], callback);  
    },  
    updateProduct: function(id, Product, callback) {  
        return db.query("CALL `mydb`.`updateProduct`(?,?,?,?,?)", [id, Product.Name, Product.Type, Product.Price, Product.Stock], callback);  
    },  
	updateProductIdBody: function(Product, callback) {  
        return db.query("CALL `mydb`.`updateProduct`(?,?,?,?,?)", [Product.Id, Product.Name, Product.Type, Product.Price, Product.Stock], callback);  
    },
    getCountProducts: function(callback){
        return db.query("CALL `mydb`.`getCountProducts`()", callback);
    }  
};  
module.exports = Products; 