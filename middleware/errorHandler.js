var path = require('path');
var errorhandler = require('errorhandler');
var HttpError = require('error/HttpError').HttpError;

module.exports = function(app){
    app.use(function(req, res, next) {
        var err = new HttpError(404, 'Страница не найдена!');
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