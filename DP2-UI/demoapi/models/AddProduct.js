var db = require('../dbconnection'); //reference of dbconnection.js  
var AddProduct = {  
		addProduct: function(Product, callback) {  
        return db.query("Insert into Product(Name, Type, Price, Stock) values(?,?,?,?)", [Product.Name, Product.Type, Product.Price, Product.Stock], callback);  
    }  
};  
module.exports = AddProduct; 