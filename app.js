//Дерьмо, которое мы подключаем
var express = require('express'); //Главное дерьмо
var path = require('path');//Дерьмо, которое разбивает ссылку или путь
var favicon = require('static-favicon'); //Дерьмо, связанное с иконкой сайта
var logger = require('morgan'); //Дерьмо, которое выводит всё в консольку, не пользуемся
var cookieParser = require('cookie-parser'); //Дерьмо, которое парсит куки
var bodyParser = require('body-parser'); //Дерьмо
var config = require('config'); //Наше дерьмо, куда мы записываем конфиг
var log = require('libs/log')(module); //Наше дерьмо, которое выводит всё в консольку
var http = require('http'); //Дерьмо отвечает за соединение http
var mongoose = require('mongoose'); //Дерьмо отвечает за БД
var session = require('express-session'); //Дерьмо отвечает за сессии
var MongoStore = require('connect-mongo')(session); //Дерьмо, которое нужно чтобы соединяться с БД для сессий

//Дерьмо
var app = express();

//Чем мы отображаем вьюхи, отображаем джейдом
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Всякие миддлвэры из дерьма, которые подключали
app.use(favicon()); //иконка
app.use(logger('dev')); //логгер, выводит в консольку нам всё
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser()); //Парсит нам кукишки
app.use(session({ //Сессичные
    secret: config.get('session:secret'),
    resave: false,
    saveUninitialized: true,
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(express.static(path.join(__dirname, 'public'))); //Статика

//app.use(require('middleware/loadUser'));
app.use(require('middleware/sendHttpError'));
require('routes')(app);
require('middleware/errorHandler')(app);

//Серверное дерьмо
http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

module.exports = app;