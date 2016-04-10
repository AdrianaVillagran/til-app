var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BowSchema = new Schema({
          beadOfWisdom: String,
          date: String,
          description: String,
          resourceUrl: String,
          topic: String,
          username: String
        });

var Bow = mongoose.model('Bow', BowSchema);

module.exports = Bow;
