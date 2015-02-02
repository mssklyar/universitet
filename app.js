var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var log = require('libs/log')(module);
var http = require('http');
var mongoose = require('mongoose');

// My comments
// My comments 2

var app = express();

/*
app.set('port', config.get('port'));
var server = app.listen(app.get('port'), function() {
    log.info('Express server listening on port ' + server.address().port);
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var routes = require('./routes/index');
var users = require('./routes/users');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

var MongoStore = require('connect-mongo')(express);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongoose_connection: mongoose.connection})
}));
app.use(express.static(path.join(__dirname, 'public')));

var user = require('models/user').User;

app.get('/users', function(req, res, next){
    user.find({}, function(err, users){
        if (err) return next(err);
        res.json(users);
    })
})

app.use('/', routes);
//app.use('/users', users);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

module.exports = app;