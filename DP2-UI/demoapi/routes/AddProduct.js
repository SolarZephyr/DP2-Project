var express = require('express');  
var router = express.Router();  
var AddProduct = require('../models/AddProduct');  
router.post('/', function(req, res, next) {  
    AddProduct.addProduct(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  
module.exports = router; 