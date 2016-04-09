var db = require('../models');

function index(req, res) {


}


function create(req, res) {
  if(!req.user) {
    return res.sendStatus(401);
  }

  var userId = req.params.userId;

  var newBow = new db.Bow(req.body);

  db.User.findById(userId, function(err, foundUser) {
    if(err) {
      console.log("There was an error finding user", err);
      res.status(404);
    }
    foundUser.bows.push(newBow);
    foundUser.save(function (err, savedUser) {
      if(err) {
        console.log("There was an error saving user", err);
        res.status(400);
      }
      res.status(200).json(newBow);
    });
  });
}



function show(req, res) {



}

function destroy(req, res) {
  if(!req.user) {
    return res.sendStatus(401);
  }

  var userId = req.params.userId;
  var bowId = req.params.id;

  db.User.findById(userId, function(err, foundUser) {
    if(err) {
      console.log('error finding user', err);
      res.status(404);
    }
    var foundBow = foundUser.bows.id(bowId);

    foundBow.remove();
    foundUser.save(function (err, savedUser) {
      if (err) {
        console.log('error saving user after delete', err);
        res.status(500);
      }
      res.json(foundBow);
    });
  });
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
