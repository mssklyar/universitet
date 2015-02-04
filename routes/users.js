var express = require('express');
var router = express.Router();
var User = require('models/user').User;
//var mongoose = require('libs/mongoose');


router.get('/', function(req, res, next) {
    User.find({}, function(err, data){
        if (err) return next(err);
        res.json(data);
    })
});

module.exports = router;
