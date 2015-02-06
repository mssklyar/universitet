var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('frontpage', {
        title: 'Подполье',
        userId: req.session.user
    });
});

module.exports = router;
