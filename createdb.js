var mongoose = require('libs/mongoose');
mongoose.set('debug', true);
var async = require('async');


async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('models/user');
    require('models/city');
    require('models/univer');
    require('models/faculty');
    require('models/subject');


    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    var newsubject = {
        name: 'Уголовное право'
    };

    var Subject = new mongoose.models.Subject(newsubject);
    Subject.save(function(err, data){

        var newfaculty = {
            name: 'Юридический',
            subjects: [Subject._id]
        };

        var Faculty = new mongoose.models.Faculty(newfaculty);
        Faculty.save(function(err, data){

            var newuniver = {
                name: 'НЮИ (ф) ТГУ',
                faculties: [Faculty._id]
            };

            var Univer = new mongoose.models.Univer(newuniver);
            Univer.save(function(err, data){

                var newcity = {
                    name: 'Новосибирск',
                    univers: [Univer._id]
                };

                var City = new mongoose.models.City(newcity);
                City.save(function(err, data){

                    var newuser = {
                        username: 'max',
                        password: 'orangetree',
                        info: {
                            name: 'Максим',
                            lastname: 'Скляр',
                            city: City._id,
                            univer: Univer._id,
                            faculty: Faculty._id
                        }
                    };

                    var User = new mongoose.models.User(newuser);
                    User.save(callback);
                })

            })

        })

    });

}