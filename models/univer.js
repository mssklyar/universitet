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

schema.statics.findDupUniver = function(nameOfUniver, data) {
    this.findOne({name: nameOfUniver.toUpperCase()}, data);
};

/*
schema.statics.schemaToArray = function() {
   return this.requiredPaths;
};
*/

exports.Univer = mongoose.model('Univer', schema);