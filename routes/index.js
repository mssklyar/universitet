var express = require('express');
var router = express.Router();

//Роутеры
var users = require('routes/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//-------------------------------------------//
//Это дерьмо можно убрать
var user = require('models/user').User;

router.get('/users', function(req, res, next){
    user.find({}, function(err, users){
        if (err) return next(err);
        res.json(users);
    })
})

//app.use('/users', users);
//-------------------------------------------//

module.exports = router;
