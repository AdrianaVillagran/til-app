var db = require('../models');

function index(req, res) {
  console.log('this is getting called');
  db.User.find({}, function (err, users) {
    if (err) {
      console.log("error GETting users", err);
      res.status(404);
    }
    res.status(200).json(users);
  });

}



// export public methods here
module.exports = {
  index: index
};
