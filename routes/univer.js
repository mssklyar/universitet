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
        /*var counter = 0;
        for (var key in req.body) {counter++;}*/

        Univer.findDupUniver(req.body["nameOfUniver"], function (err, result) {    //Метода проверяет есть ли уже такой универ в бд
            if (err) throw err;
            if (result) {
                res.send("Универ уже есть такой!");
            } else {
                Faculty.findDupFaculty(req.body, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        res.send("Факультет такой есть уже!");
                    }else{

                        var counter = 0;
                        for (var key in req.body) {counter++;}

                        for (var x = 1; x <= ((counter - Univer.schema.requiredPaths().length)/Faculty.schema.requiredPaths().length) ; x++) {
                            new Faculty({
                                name: req.body["nameOfFaculty"+toString(x)],
                                fuck: req.body["fuckOfFaculty"+toString(x)]
                            }).save(function (err) {
                                if (err) throw err;
                            });
                        }
                        res.send("GOOD!" +(counter - Univer.schema.requiredPaths().length)/Faculty.schema.requiredPaths().length );
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