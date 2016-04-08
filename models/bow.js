var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BowSchema = new Schema({
          beadOfWisdom: String,
          date: Date,
          description: String,
          resourceUrl: String,
          topic: String
        });

var Bow = mongoose.model('Bow', BowSchema);

module.exports = Bow;
