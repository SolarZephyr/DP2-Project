var express = require('express');  
var router = express.Router();  
var Transactions = require('../models/Transactions');  
router.get('/:id?', function(req, res, next) {  
    Transactions.getAllTransactions(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});
});		
router.post('/', function(req, res, next) {  
    Transactions.newTransaction(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  
router.get('/Max', function(req, res, next) {  
    Transactions.maxTransaction(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});
});	

module.exports = router; 