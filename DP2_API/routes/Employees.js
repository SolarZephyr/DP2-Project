var express = require('express');  
var router = express.Router();  
var Employees = require('../models/Employees');  
router.get('/:id?', function(req, res, next) {   
	if (req.params.id) {  
		Products.getEmployeesById(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
	} else {  
        Products.getAllEmployees(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);
			}  
		});  
    }  
});  
router.put('/', function(req, res, next) {  
    Products.updateEmployees(req.body, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }
    });  
});  
module.exports = router; 