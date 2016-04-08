var db = require("./models");

var sampleBeads = [{
                      beadOfWisdom: "Apparently, de-extinction is possible!",
                      date: "Apr. 7, 2016",
                      description:"Stewart Brand an environmentalist and founder of The WELL andthe Global Business Network, says that we now have technology that is advanced enough to bring back extinct creatures like dodo birds, passenger pidgeons, and even wooly mammoths.",
                      resource: {
                                title: "TED Radio Hour",
                                url: "http://www.npr.org/2013/08/10/209178988/the-hackers"
                                },
                      topic: "natural history"
                    },
                    {
                      beadOfWisdom: "My dog can read my mind!",
                      date: "Apr. 8, 2016",
                      description:"Fun facty fact stuff",
                      resource: {
                                title: "TED Radio Hour",
                                url: "http://www.npr.org/2013/08/10/209178988/the-hackers"
                                },
                      topic: "science"
                    }];

db.Bow.remove({}, function(err, bows){

  db.Bow.create(sampleBeads, function(err, bows){
    if (err) { return console.log('ERROR', err); }
    console.log("created", bows.length, "bows");
    process.exit();
  });
});
