var express = require('express');
var router = express.Router();
var Univer = require('models/univer').Univer;
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
    Univer.findUniver(function(err, result) {
        if (err) throw err;
        res.render('univer', { title: 'Univer', dat: result });
    });
});

router.post('/', function(req, res, next) {
    if (!req.body) {
        res.sendStatus(400);                                                    //Если нет ланных с формы, то нихуя и статус 400
    } else {
        Univer.findDupUniver(req.body.nameofUniver, function (err, result) {    //Метода проверяет есть ли уже такой универ в бд
            if (err) throw err;
            if (result) {
                res.send("Такой универ уже есть!");
            } else {
                var go  = new Univer({name: req.body.nameofUniver.toUpperCase()});
                go.save(function (err) {
                    if (err) throw err;
                    res.send(req.body.nameofUniver + " добавлен!");
                });
            }
        });
    }
});

module.exports = router;