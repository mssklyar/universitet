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

exports.Univer = mongoose.model('Univer', schema);