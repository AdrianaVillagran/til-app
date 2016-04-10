var db = require('../models');

function index(req, res) {
  db.User.find({}, function (err, users) {
    if (err) {
      console.log("error GETting users", err);
      res.status(404);
    }
    res.status(200).json(users);
  });

}


function create(req, res) {
  // if(!req.user) {
  //   return res.sendStatus(401);
  // }

  var username = req.params.username;
  console.log(username);

  var newBow = new db.Bow({
                            username: req.body.username,
                            date: req.body.date,
                            beadOfWisdom: req.body.beadOfWisdom,
                            description: req.body.description,
                            topic: req.body.topic,
                            resourceUrl: req.body.resourceUrl
                          });
  console.log(newBow);

  db.User.findOne({username: username}, function(err, foundUser) {
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
  var username = req.params.username;
  db.User.findOne({username: username}, function(err, foundUser) {
    if(err) {
      console.log('error finding user', err);
      res.status(404);
    }
    var foundBows = foundUser.bows;
    res.json(foundUser.bows);
  });


}

function destroy(req, res) {
  // if(!req.user) {
  //   return res.sendStatus(401);
  // }

  var username = req.params.username;
  var bowId = req.params.id;

  db.User.findOne({username:username}, function(err, foundUser) {
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
  // if(!req.user) {
  //   return res.sendStatus(401);
  // }

  var username = req.params.username;
  var bowId = req.params.id;


  db.User.findOne({username:username}, function (err, foundUser) {
    if(err) {
      console.log("error finding user to update", err);
      res.send(404);
    }

    var foundBow = foundUser.bows.id(bowId);
    foundBow.beadOfWisdom = req.body.beadOfWisdom;
    foundBow.description = req.body.description;
    foundBow.date = foundBow.date;
    foundBow.resourceUrl= req.body.resourceUrl;
    foundBow.topic = req.body.topic;

    foundUser.save(function (err, savedUser) {
      if(err) {
        console.log("error saving updated user", err);
        res.send(400);
      }
      res.json(foundBow);
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
