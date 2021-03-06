var db = require('../models');

// GET /api/bows
function index(req, res) {
  db.User.find({}, function (err, users) {
    if (err) { res.status(500); }

    /* TODO: this is a fun data structure, but a dangerous one. It can quickly grow huge and take a large amount of time.
    ICould you get away with simply doing a db.Bow.find() ? It might not be what you want, so I'm not going to judge.
    I'm super stoked you conquered the two-dimensional array challenge :) -jc */

  // filter through users and isolate all bows
    var bows = [];
    users.forEach(function (user) {
      user.bows.forEach(function (bow) {
        bows.push(bow);
      });
    });
    console.log("BOWS LENGTH: ", bows.length);
    res.json(bows);
  });
}


function create(req, res) {

}

function show(req, res) {


}

function destroy(req, res) {

}

function update(req, res) {


}
/* TODO: Don't export empty functions. This is a security issue. -jc */
// export public methods here
module.exports = {
  index: index
};


// HYPOTHETCAL SANDBOX
// Using query builder

function getAllBowsByDate(req, res) {
  // not sure on this one.
  var searchDate = req.query.date;
  db.User.find({}, function allUsers(err, allUsers) {
    if (err) { res.status(500); }
    // now we have all the users.
    matchingBows = [];
    allUsers.forEach(function(user) {
      user.bows.forEach( function(bow) {
        if (bow.date === searchDate){
          matchingBows.push(bow);
        }
      });
    });
    res.json(matchingBows);
  });
}
