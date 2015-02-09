var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var faculty = require('models/faculty').Faculty;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    faculties: {
        type: Array
    }
});

schema.statics.findUniver = function(data) {
    this.find({}, data);
};

schema.statics.findDupUniver = function(nameOfUniver, data) {
    this.findOne({name: nameOfUniver.toUpperCase()}, data);
};

schema.statics.saveUniver = function(ofData) {
    var counter = 0;
    var data = null;
    var arr = new Array();
    console.log("Я тут!");
    for (var key in ofData) {counter++;}
    for(var x = 1; x <= ((counter - this.schema.requiredPaths().length)/faculty.schema.requiredPaths().length) ; x++) {
        faculty.findOne({name: ofData["nameOfFaculty" + x]}, data);
        console.log(data);
        arr[x] = data._id;
    }
    new this({
        name: ofData["nameOfUniver"].toUpperCase(),
        faculties: arr
    }).save(function (err) {
        if (err) throw err;
    });
};

exports.Univer = mongoose.model('Univer', schema);