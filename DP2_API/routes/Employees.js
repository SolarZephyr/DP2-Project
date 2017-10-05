var express = require('express');  
var router = express.Router();  
var Employees = require('../models/Employees');  
router.get('/:id?', function(req, res, next) {   
	if (req.params.id) {  
		Employees.getEmployeesById(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
	} else {  
        Employees.getAllEmployees(function(err, rows)  {  
			if (err) {  
				res.json(err);  
			} else {  
				res.json(rows);
			}  
		});  
    }  
}); 
router.get('/Ids', function(res) {
    Employees.getEmployeesIds(function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }  
    });
});

router.post('/', function(req, res, next) {  
    Employees.addEmployee(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  

router.put('/', function(req, res, next) {  
    Employees.updateEmployees(req.body, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }
    });  
});
module.exports = router; 