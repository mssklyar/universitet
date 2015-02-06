var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        userId: req.session.user
    });
});

//хуй

module.exports = router;
