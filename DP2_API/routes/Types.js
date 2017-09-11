var express = require('express');  
var router = express.Router();  
var Types = require('../models/Types');  
router.get('/:id?', function(req, res, next) {  
    Types.getAllTypes(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);  
			}  
		});
});		
router.post('/', function(req, res, next) {  
    Types.addType(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  
module.exports = router; 