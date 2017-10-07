var express = require('express');  
var router = express.Router();  
var Products = require('../models/Products');  
router.get('/skip/:skip/take/:take', function(req, res, next) {  
    Products.getProductsPage(Number(req.params.skip), Number(req.params.take), function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});
});		
router.get('/id/:id', function(req, res, next) {   
    Products.getProductById(req.params.id, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }  
    });  	
});  
router.get('/all', function(req, res, next) {  
    Products.getAllProducts(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});
});	 
router.post('/', function(req, res, next) {  
    Products.addProduct(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  
router.put('/:id?', function(req, res, next) {  
    Products.updateProduct(req.params.id, req.body, function(err, rows) {  
	if (req.params.id) { 
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }
	} else {
		Products.updateProductIdBody(req.body, function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});  
    }
    });  
});  
module.exports = router; 