var crypto = require('crypto');
var async = require('async');
var util = require('util');

var faculty = require('models/faculty').Faculty;
var univer = require('models/univer').Univer;
var city = require('models/city').City;

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

/**
 * Юзер
 * |-username
 * |-hashedPassword
 * |-salt
 * |-created
 * |-info
 *   |-name
 *   |-lastname
 *   |-city -> id of city
 *   |-univer -> id of univer
 *   |-faculty -> id of faculty
 */

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    info: {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'city'
        },
        univer: {
            type: Schema.Types.ObjectId,
            ref: 'univer'
        },
        faculty: {
            type: Schema.Types.ObjectId,
            ref: 'faculty'
        }
    }
});

schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, callback){
    var User = this;
    async.waterfall([
        function(callback){
            User.findOne({username: username}, callback);

        },
        function(user, callback){
            if (user){
                if (user.checkPassword(password)){
                    callback(null, user);
                } else {
                   callback(new AuthError('Неправильный пароль!'));
                }
            } else {
                var user = new User({username: username, password: password});
                user.save(function(err){
                    if (err) return next(err);
                    callback(null, user);
                })
            }
        }
    ],callback)
}

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);
    this.message = message;
}

util.inherits(AuthError, Error);
AuthError.prototype.name = 'AuthError';
exports.AuthError = AuthError;

exports.User = mongoose.model('User', schema);