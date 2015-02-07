var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var subject = require('models/subject').Subject;
var bodyParser = require('body-parser');

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    fuck: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'subject' }]

});

schema.statics.findDupFaculty = function(nameofFaculty, data) {
    var counter = 0;
    for (var key in nameofFaculty) {counter++;}
    for(var x = 1; x <= counter ; x++){
        this.findOne({name: nameofFaculty["nameOfFaculty" + toString(x)] }, data);
        if(!data){break;}
    }

};



exports.Faculty = mongoose.model('Faculty', schema);