var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

// var Bow = require('./bow.js');

var UserSchema = new Schema({
  username: {type: String, required: true},
  password: String,
  createdAt: {type: Date, default: Date.now()},
  // bows: [Bow.schema]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
