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
        var counter = 0;
        var x;
        var arr = new Array();
        var fId = new Array();
        for (var key in req.body) {counter++;}
        var len = ((counter - Univer.schema.requiredPaths().length)/Faculty.schema.requiredPaths().length);
        arr[0] = {name: req.body["nameOfUniver"].toUpperCase()};
        for (x = 1 ; x <= len ; x++){
            arr[x] = {
                "name": req.body["nameOfFaculty" + x].toUpperCase(),
                "fuck": req.body["fuckOfFaculty" + x].toUpperCase()
            };
        };

        console.log(arr[1]["name"]);
        Univer.findOne({name: arr[0]}, function(err, data){
            if (err) throw err;
            if (data){
                res.send("Есть универ такой!");
            }else{
                console.log(len);
                for (x = 1 ; x <= len ; x++) {
                    console.log(arr[x]);
                    Faculty.findOne({name: arr[x]["name"]}, function (err, data) {
                        if (err) throw err;
                        if(!data){
                            console.log(len);
                            console.log(arr[1]);
                            new Faculty(arr[x]).save(function(err){
                                if(err) throw err;
                                Faculty.findOne({name: arr[x]["name"]}, function(err, data){
                                    //fId[x] = data._id;

                                })
                            });
                        }else{console.log(data)}
                    });
                }
                res.send(fId);

            }
        });
       /* Univer.findDupUniver(req.body["nameOfUniver"], function (err, result) {    //Метода проверяет есть ли уже такой универ в бд
            if (err) throw err;
            if (result) {
                res.send("Уже универ есть такой!");
            } else {
                //req.body, Univer.schema.requiredPaths().length,
                Faculty.findDupFaculty(req.body, Univer.schema.requiredPaths().length, function (err, result) {
                    if (err) throw err;
                    Univer.saveUniver(req.body, function(err){
                        if (err) throw err;
                        res.send("GOOD!" + result);
                    });
                });


                *//*var go  = new Univer({name: req.body.nameOfUniver.toUpperCase()});
                go.save(function (err) {
                    if (err) throw err;*//*
                    res.send(req.body.nameofUniver + " добавлен!");
               //});
            }
       });*/git
    }
});

module.exports = router;