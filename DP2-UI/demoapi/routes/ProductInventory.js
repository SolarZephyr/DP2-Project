var express = require('express');  
var router = express.Router();  
var ProductInventory = require('../models/ProductInventory');  
router.get('/:id?', function(req, res, next) {   
    ProductInventory.getAllProducts(req.params.id, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }  
    });  
}); 
module.exports = router; 