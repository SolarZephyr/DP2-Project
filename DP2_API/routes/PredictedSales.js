var express = require('express');  
var router = express.Router();  
var PredictedSales = require('../models/PredictedSales');  
router.get('/', function(req, res, next) {   
		PredictedSales.getPredictedSalesForItems(function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows); 
        }  
    });  
});  
router.get('/:type', function(req, res, next) {   
		PredictedSales.getPredictedSalesForType(req.params.id, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows); 
        }  
    });  
});  
module.exports = router; 