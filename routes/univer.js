var express = require('express');
var router = express.Router();
var Univer = require('models/univer').Univer;
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
    res.render('univer', { title: 'Univer' });
});

router.post('/', function(req, res, next) {


 /*   Univer.find({name: req.body.name}, function(err, data){
        if (err) return next(err);
        res.send("Такой универ уже есть!");
    });*/
    if (!req.body) {res.sendStatus(400)
    }else{
        res.end(req.body.nameofUniver);
    }
});

module.exports = router;