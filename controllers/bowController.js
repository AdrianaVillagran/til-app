var db = require('../models');

// GET /api/bows
function index(req, res) {
  db.User.find({}, function (err, users) {
    if (err) { res.status(404); }

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
// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
