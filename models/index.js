var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/til-app");

module.exports.Bow = require('./bow.js');
