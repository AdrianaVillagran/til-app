var db = require('../models');

// GET /api/bows
function index(req, res) {
  
  db.Bow.find(function (err, bows) {
    if(err) {
      res.status(404).send("Beads of wisdom not found!");
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
