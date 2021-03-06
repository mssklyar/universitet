var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;
var faculty = require('models/faculty').Faculty;

var schema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    faculties: [{ type: Schema.Types.ObjectId, ref: 'faculty' }]
});

exports.Univer = mongoose.model('Univer', schema);

//********************************************************************************
/*var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var personSchema = Schema({
    _id     : Number,
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
    _creator : { type: Number, ref: 'Person' },
    title    : String,
    fans     : [{ type: Number, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var aaron = new Person({ _id: 0, name: 'Aaron', age: 100 });

aaron.save(function (err) {
    if (err) return handleError(err);

    var story1 = new Story({
        title: "Once upon a timex.",
        _creator: aaron._id    // assign the _id from the person
    });

    story1.save(function (err) {
        if (err) return handleError(err);
        // thats it!
    });
})*/