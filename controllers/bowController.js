var db = require('../models');

// GET /api/bows
function index(req, res) {

  db.Bow.find(function (err, bows) {
    if(err) {
      res.status(404).send("Beads of wisdom not found!");
    }
    res.status(200).json(bows);
  });

}


function create(req, res) {
  db.Bow.create(req.body, function(err, bow) {
     if (err) { console.log('error creating bow', err); }
     console.log("New bow created!", bow);
     res.status(200).json(bow);
   });
}

function show(req, res) {



}

function destroy(req, res) {
  var bowId = req.params.id;
  db.Bow.findOneAndRemove({_id: bowId}, function (err, foundBow) {
    if(err) { console.log('There was an error', err); }
    res.status(200).json(foundBow);
  });
}

function update(req, res) {
  var bowId = req.params.id;
  db.Bow.findById(bowId, function(err, foundBow) {
    if(err) {
      console.log("There was an error updating bow", err);
    }
    foundBow.beadOfWisdom = req.body.beadOfWisdom;
    foundBow.description = req.body.description;
    foundBow.date = foundBow.date;
    foundBow.resourceUrl= req.body.resourceUrl;
    foundBow.topic = req.body.topic;
    console.log(foundBow);
    foundBow.save(function (err, updatedBow) {
      if(err) {console.log("There was an error updating bow", err);}
      res.status(200).json(updatedBow);
    });
  });
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
