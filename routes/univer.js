var express = require('express');
var router = express.Router();
var Univer = require('models/univer').Univer;
var Faculty = require('models/faculty').Faculty;
var bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
    Univer.findUniver(function(err, result) {
        if (err) throw err;

        //ПОТОМ В МОДЕЛЬ ЗАСУНУТЬ!
        //--------------------------------------------
        var arr = Faculty.schema.requiredPaths();
        var str = '';
        for (var x = arr.length - 1; x >= 0 ; x--){
            str+= arr[x] + ' ';
        };
        //---------------------------------------------

        res.render('univer', {
            title: 'Повар, спрашивает повара',
            nameOfFields: Univer.schema.requiredPaths(),
            schemOfFaculty: Faculty.schema.requiredPaths(),
            data: result,
            st: str
        });
    });
});

router.post('/', function(req, res, next) {
    if (!req.body) {
        res.sendStatus(400);                                                    //Если нет ланных с формы, то нихуя и статус 400
    } else {
        Univer.findDupUniver(req.body["nameOfUniver"], function (err, result) {    //Метода проверяет есть ли уже такой универ в бд
            if (err) throw err;
            if (result) {
                res.send("Универ уже есть такой!");
            } else {
                Faculty.findDupFacultyAndSaveAndGetId(req.body, Univer.schema.requiredPaths().length, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        res.send("Факультет такой есть уже!");
                    }else{
                        res.send("fefefe");
                    }
                });


        /*        var go  = new Univer({name: req.body.nameOfUniver.toUpperCase()});
                go.save(function (err) {
                    if (err) throw err;
                    res.send(req.body.nameofUniver + " добавлен!");
                });*/
            }
        });
    }
});

module.exports = router;