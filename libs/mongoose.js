var mongoose = require('mongoose');
var config = require('config');

//mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.connect('mongodb://admin:orangetree@ds037611.mongolab.com:37611/project', config.get('mongoose:options'));

module.exports = mongoose;