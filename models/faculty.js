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

schema.statics.findDupFacultyAndSaveAndGetId = function(ofFaculty, un, data) {
    var counter = 0;
    var gor;
    for (var key in ofFaculty) {counter++;}
    for(var x = 1; x <= ((counter - un)/this.schema.requiredPaths().length) ; x++){
        data = null;
        console.log(ofFaculty["nameOfFaculty" + x]);
        this.findOne({name: ofFaculty["nameOfFaculty" + x] }, data);
        if(data){
            console.log(data);
            break;
        }else{
            console.log(data);
            new this({
                name: ofFaculty["nameOfFaculty"+x],
                fuck: ofFaculty["fuckOfFaculty"+x]
            }).save(function (err) {
                if (err) throw err;
                //this.findOne({name: ofFaculty["nameOfFaculty" + x] }, arr);
            });

        }
    }
};



exports.Faculty = mongoose.model('Faculty', schema);