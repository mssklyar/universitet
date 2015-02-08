var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('frontpage', {
        title: 'Подполье',
        user: req.user
    });
});

module.exports = router;
