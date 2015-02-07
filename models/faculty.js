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

schema.statics.findDupFaculty = function(nameofFaculty, data) {
    this.findOne({name: nameofFaculty.toUpperCase()}, data);
};



exports.Faculty = mongoose.model('Faculty', schema);