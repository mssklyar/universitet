var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

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
    univer: {
        type: Id
    }

});

exports.Subject = mongoose.model('Subject', schema);