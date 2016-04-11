var mongoose = require("mongoose");

mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  "mongodb://localhost/til-app");

module.exports.Bow = require('./bow.js');
module.exports.User = require('./user.js');
