var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var subject = require('models/subject').Subject;

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

schema.statics.findDupFacultyAndSave = function(ofFaculty, un) {
    var counter = 0;
    var data = null;
    for (var key in ofFaculty) {counter++;}
    for(var x = 1; x <= ((counter - un)/this.schema.requiredPaths().length) ; x++) {
        //data = null;
        console.log(ofFaculty["nameOfFaculty" + x]);
        this.findOne({name: ofFaculty["nameOfFaculty1"].toUpperCase()}, data);
        console.log(data);
        if (!data) {
            new this({
                name: ofFaculty["nameOfFaculty" + x].toUpperCase(),
                fuck: ofFaculty["fuckOfFaculty" + x].toUpperCase()
            }).save(function (err) {
                    if (err) throw err;
                    counter = 5;
                });

        }
    }
};



exports.Faculty = mongoose.model('Faculty', schema);