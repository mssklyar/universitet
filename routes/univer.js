var express = require('express');
var router = express.Router();
var Univer = require('models/univer').Univer;
var Faculty = require('models/faculty').Faculty;
var bodyParser = require('body-parser');
var async = require('async');

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

        var arr = new Array();
        var fId = new Array();

        var univ = {name: req.body["nameOfUniver"].toUpperCase()};

        var counter = 0;
        for (var key in req.body) {counter++;}
        var len = ((counter - Univer.schema.requiredPaths().length)/Faculty.schema.requiredPaths().length);

        for (var x = 1 ; x <= len ; x++){
            arr[x-1] = {
                "name": req.body["nameOfFaculty" + x].toUpperCase(),
                "fuck": req.body["fuckOfFaculty" + x].toUpperCase()
            };
        };
        async.waterfall([
            function(callback){
                Univer.findOne({name: univ["name"]}, callback);
            },
            function(univer, callback){
                if (univer) {
                    res.send("Есть универ такой!");
                    callback;
                } else {
                    async.each(arr, function(fac, callback){
                        console.log(fac);
                        async.waterfall([
                            function(callback){
                                Faculty.findOne({name: fac["name"]}, callback);
                            },
                            function(facultet, callback){
                                if (!facultet) {
                                    new Faculty(fac).save(callback);
                                } else {
                                    callback;
                                }
                            },
                            function(callback){
                                Faculty.findOne({name: fac["name"]}, callback);
                            },
                            function(result, callback){
                                fId.push(result._id);
                                callback;
                            }], callback);

                        }, callback)
                }
            },
            function(callback){
                Univer.findOne({name: univ["name"]}, callback);
            },
            function(univer, callback){
                console.log(univer);
                if (univer) {
                    res.send("Есть универ такой!");
                    callback;
                } else {

                    univ["faculties"] = fId;
                    console.log(univ);
                    new Univer(univ).save(callback)
                }
            }
        ], function(a,b){console.log(a,b)});
    }
});

module.exports = router;