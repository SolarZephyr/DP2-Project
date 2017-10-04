var express = require('express');  
var router = express.Router();  
var Transactions = require('../models/PredictedSales');  
router.get('/skip/:skip/take/:take', function(req, res, next) {  
    Transactions.getAllPredictedSales(Number(req.params.skip), Number(req.params.take), function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});
});

module.exports = router; 