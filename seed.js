var db = require("./models");

var sampleUsers = [{
                    username: "steve",
                    password: "hedgehog",
                    bows: {
                            beadOfWisdom: "Apparently, de-extinction is possible!",
                            date: "04/09/2016",
                            description:"Stewart Brand an environmentalist and founder of The WELL andthe Global Business Network, says that we now have technology that is advanced enough to bring back extinct creatures like dodo birds, passenger pidgeons, and even wooly mammoths.",
                            resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                            topic: "natural history"
                          }
                   },
                   {
                     username: "steve",
                     password: "hedgehog",
                     bows: {
                             beadOfWisdom: "Apparently, de-extinction is possible!",
                             date: "04/09/2016",
                             description:"Stewart Brand an environmentalist and founder of The WELL andthe Global Business Network, says that we now have technology that is advanced enough to bring back extinct creatures like dodo birds, passenger pidgeons, and even wooly mammoths.",
                             resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                             topic: "natural history"
                           }
                    }];

var sampleBeads = [{
                      beadOfWisdom: "Apparently, de-extinction is possible!",
                      date: "04/09/2016",
                      description:"Stewart Brand an environmentalist and founder of The WELL andthe Global Business Network, says that we now have technology that is advanced enough to bring back extinct creatures like dodo birds, passenger pidgeons, and even wooly mammoths.",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "natural history"
                    },
                    {
                      beadOfWisdom: "My dog can read my mind!",
                      date: "04/09/2016",
                      description:"Fun facty fact stuff",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "science"
                    },
                    {
                      beadOfWisdom: "My dog can read my mind!",
                      date: "04/09/2016",
                      description:"Fun facty fact stuff",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "science"
                    },
                    {
                      beadOfWisdom: "My dog can read my mind!",
                      date: "04/09/2016",
                      description:"Fun facty fact stuff",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "science"
                    },
                    {
                      beadOfWisdom: "My dog can read my mind!",
                      date: "04/09/2016",
                      description:"Fun facty fact stuff",
                      resourceUrl: "http://www.npr.org/2013/08/10/209178988/the-hackers",
                      topic: "science"
                    }];

db.Users.remove({}, function(err, users){

  db.Users.create(sampleUsers, function(err, users){
    if (err) { return console.log('ERROR', err); }
    console.log("created", users.length, "bows");
    console.log(users);
  });

  
});
