var db = require('../dbconnection'); //reference of dbconnection.js  
var Products = {  
    getAllProducts: function(callback) {  
        return db.query("Select * from product", callback);  
    },  
    getProductById: function(id, callback) {  
        return db.query("select * from product where Id = ?", [id], callback);  
    },  
    addProduct: function(Product, callback) {  
        return db.query("Insert into product (name, type, price, stock) values(?,?,?,?)", [Product.name, Product.type, Product.price, Product.stock], callback);  
    },  
    updateProduct: function(Product, callback) {  
        return db.query("update product set name=?,type=?,price=?,stock=? where id=?", [Product.name, Product.type, Product.price, Product.stock, Product.id], callback);  
    }  
};  
module.exports = Products; 