var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var univer = require('models/univer').Univer;

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

    univers: [{ type: Schema.Types.ObjectId, ref: 'univer' }]
});

exports.City = mongoose.model('City', schema);