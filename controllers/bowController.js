var db = require('../models');

// GET /api/bows
function index(req, res) {
  db.User.find({}, function (err, users) {
    if (err) { res.status(404); }

    /* TODO: this is a fun data structure, but a dangerous one. It can quickly grow huge and take a large amount of time.  ICould you get away with simply doing a db.Bow.find() ? It might not be what you want, so I'm not going to judge.  I'm super stoked you conquered the two-dimensional array challenge :) -jc */
  // filter through users and isolate all bows
    var bows = [];
    for(var i=0; i < users.length; i++) {
      if(users[i].bows.length>0) {
        bows.push(users[i].bows);
      }
    }
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
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
