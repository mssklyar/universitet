var express = require('express');
var router = express.Router();
var user = require('models/user').User;

router.get('/users', function(req, res, next) {

    user.find({}, function(err, users){
        if (err) return next(err);
        res.json(users);
    })
});

module.exports = router;
