var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BowSchema = new Schema({
          beadOfWisdom: String,
          date: String,
          description: String,
          resource: {
                  title: String,
                  url: String
                  },
          topic: String
        });

var Bow = mongoose.model('Bow', BowSchema);

// exports Album schema to be accessible to all files with this express app
module.exports = Bow;
