var express = require('express');  
var router = express.Router();  
var Transactions = require('../models/PredictedSales');  
router.get('/:sort?', function(req, res) {   
	if (req.params.id) {  
		PredictedSales.getPredictedSales(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
	}
}); 

module.exports = router; 