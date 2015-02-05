var express = require('express');
var router = express.Router();
var Univer = require('models/univer').Univer;
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
    Univer.find({}, function(err, data){
        if (err) return next(err);
        res.render('univer', { title: 'Univer', dat: data });
    });
});

router.post('/', function(req, res, next) {
    if (!req.body) {res.sendStatus(400)
    }else{

        Univer.findOne({name: req.body.nameofUniver.toUpperCase()}, function(err, data){
            if (err) return next(err);
            if (data){
                res.send("Такой универ уже есть!");
            }else{

                var univer = new Univer({name: req.body.nameofUniver.toUpperCase()});
                univer.save(function(err){
                    if (err) return next(err);
                    res.send(req.body.nameofUniver + " добавлен!");
                });
            }

        });
    }
});

module.exports = router;