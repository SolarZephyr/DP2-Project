var express = require('express');  
var router = express.Router();  
var Sales = require('../models/Sales');  
router.get('/:id?', function(req, res, next) {  
    Sales.getSaleById(req.params.id, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }  
		});
});  
router.post('/', function(req, res, next) {  
    Sales.addSale(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  
module.exports = router; 