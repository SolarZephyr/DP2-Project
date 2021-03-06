var express = require('express');  
var router = express.Router();  
var Transactions = require('../models/Transactions');  
router.get('/skip/:skip/take/:take', function(req, res, next) {  
    Transactions.getAllTransactions(Number(req.params.skip), Number(req.params.take), function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows[0]);  
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
router.get('/max', function(req, res, next) {  
    Transactions.maxTransaction(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows[0]);  
			}  
		});
});	
router.get('/count', function(req, res, next) {  
    Transactions.countTransaction(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows[0]);  
			}  
		});
});	
router.get('/voidTransaction/:id', function(req, res, next) {  
    Transactions.updateTransactionStatus(req.params.id, 0, function(err, rows) {  

	if (err) {  
		res.json(err);  
	} else {  
		res.json(rows[0]);  
	}

    });  
});  

module.exports = router; 