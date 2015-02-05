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
    faculties: [{ type: Schema.Types.ObjectId, ref: 'faculty' }]
});

schema.statics.findUniver = function(data) {
    this.find({}, data);
};

schema.statics.findDupUniver = function(nameofUniver, data) {
    this.findOne({name: nameofUniver.toUpperCase()}, data);
};

schema.statics.saveNewUniver = function(nameofUniver) {
    new this({name: nameofUniver.toUpperCase()}).save();
    //bod = true;
};

exports.Univer = mongoose.model('Univer', schema);