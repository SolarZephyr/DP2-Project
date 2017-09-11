var express = require('express');  
var path = require('path');  
var favicon = require('serve-favicon');  
var logger = require('morgan');  
var cookieParser = require('cookie-parser');  
var bodyParser = require('body-parser');  
var cors = require('cors');  
var routes = require('./routes/index');  
var users = require('./routes/users');  
var Products = require('./routes/Products');
var Types = require('./routes/Types');
var Sales = require('./routes/Sales');
var Transactions = require('./routes/Transactions');
var app = express();  
// view engine setup  
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');  
// uncomment after placing your favicon in /public  
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  
app.use(cors());  
app.use(logger('dev'));  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
    extended: false  
}));  
app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public')));  
app.use('/', routes);  
app.use('/users', users);  
app.use('/Products', Products);
app.use('/Transactions', Transactions);
app.use('/Sales', Sales);
app.use('/Types', Types);
// catch 404 and forward to error handler  
app.use(function(req, res, next) {  
    var err = new Error('Not Found');  
    err.status = 404;  
    next(err);  
});  
// error handlers  
// development error handler  
// will print stacktrace  
if (app.get('env') === 'development') {  
    app.use(function(err, req, res, next) {  
        res.status(err.status || 500);  
        res.render('error', {  
            message: err.message,  
            error: err  
        });  
    });  
}  
// production error handler  
// no stacktraces leaked to user  
app.use(function(err, req, res, next) {  
    res.status(err.status || 500);  
    res.render('error', {  
        message: err.message,  
        error: {}  
    });  
});  
module.exports = app;  