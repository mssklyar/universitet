var path = require('path');
var util = require('util');
var http = require('http');
var errorhandler = require('errorhandler');

function HttpError(status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);
    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';
exports.HttpError = HttpError;

module.exports = function(app){
    app.use(function(req, res, next) {
       // var err = new HttpError(404);
        next(err);
    });
    app.use(function(err, req, res, next) {
        console.log(err);
        if (typeof err == 'number') { // next(404);
            err = new HttpError(err);
        }

        if (err instanceof HttpError) {
            res.sendHttpError(err);
        } else {
            if (app.get('env') == 'development') {
                errorhandler()(err, req, res, next);
            } else {
                log.error(err);
                err = new HttpError(500);
                res.sendHttpError(err);
            }
        }
    });
}