var express = require('express');
var router = express.Router();
var User = require('models/user').User;
var AuthError = require('models/user').AuthError;

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Вход' });
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(username, password, function(err, user){
        if(err){
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        } else
        {
            res.statusCode = 200;
        }
    })
});

module.exports = router;