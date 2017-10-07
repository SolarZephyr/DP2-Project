var db = require('../dbconnection.js'); //reference of dbconnection.js  
var Products = {  
    getAllProducts: function(callback) {  
        return db.query("select product.id, product.name, product.price, product.stock, producttype.description from product inner join producttype on product.type = producttype.ID", callback);  
    },
    getProductsPage: function(skip, take, callback) {  
        return db.query("select product.id, product.name, product.price, product.stock, producttype.description from product inner join producttype on product.type = producttype.ID LIMIT ?,?", [skip, take], callback);  
    },  
    getProductById: function(id, callback) {  
        return db.query("select * from product where Id = ?", [id], callback);  
    },  
    addProduct: function(Product, callback) {  
        return db.query("Insert into product (name, type, price, stock) values(?,?,?,?)", [Product.Name, Product.Type, Product.Price, Product.Stock], callback);  
    },  
    updateProduct: function(id, Product, callback) {  
        return db.query("update product set name=?,type=?,price=?,stock=? where id=?", [Product.Name, Product.Type, Product.Price, Product.Stock, id], callback);  
    },  
	updateProductIdBody: function(Product, callback) {  
        return db.query("update product set name=?,type=?,price=?,stock=? where id=?", [Product.Name, Product.Type, Product.Price, Product.Stock, Product.Id], callback);  
    }  
};  
module.exports = Products; 