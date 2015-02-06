var express = require('express');
var router = express.Router();
var User = require('models/user').User;
var async = require('async');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Вход' });
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    async.waterfall([
        function(callback){
            User.findOne({username: username}, callback);
        },
        function(user, callback){
            if (user){
                if (user.checkPassword(password)){
                    callback(null, user);
                } else {
                    next(403);
                }
            } else {
                var user = new User({username: username, password: password});
                user.save(function(err){
                    if (err) return next(err);
                    callback(null, user);
                })
            }
        }
    ], function(err, user){
        if(err) return next(err);
        req.session.user = user._id;
        res.send({});
    })
});

module.exports = router;