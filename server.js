var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;



var db = require('./models'),
    User = db.User;


// generate a new express app and call it 'app'
var app = express();
app.use('/vendor', express.static(__dirname + '/bower_components'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'hedgehog fuzz', // change this!
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets


app.set('view engine', 'hbs');

var controllers = require('./controllers');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/profile', function profilePage (req, res) {
  res.sendFile(__dirname + '/views/profile.html');
});

// show signup view
app.get('/signup', function (req, res) {
  if(req.user) {
    res.redirect('/profile');
  }
  res.render('signup');
});

// show login view
app.get('/login', function (req, res) {
  if(req.user) {
    res.redirect('/profile');
  }
  res.render('login', {user: JSON.stringify(req.user) + "|| null" }); // you can also use res.sendFile
});

/*
 * JSON Endpoints
 */

// AUTH ENDPOINTS
 // sign up and create new user
app.post('/signup', function (req, res) {
 var new_user = new User({ username: req.body.username });
 User.register(new_user, req.body.password,
   function (err, newUser) {
     if (err){
       console.log(err);
       return res.status(400);
     }
     passport.authenticate('local')(req, res, function() {
       console.log('Signup success');
       res.redirect('/profile');
     });
   }
 );
});

//function to send user information to the profile page
app.get("/api/me", function(req, res){
  res.json(req.user);
});

//function to check if user is logged in
app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user.username);
  res.redirect('/profile');
});

// log out user
app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req.user);
  req.logout();
  console.log("AFTER logout", req.user);
  res.redirect('/');
});

// JSON API ENDPOINTS / ROUTES

app.get('/api', controllers.api.index);
app.get('/api/bows', controllers.bow.index);
app.get('/api/bows/:date', controllers.bow.show);


app.get('/api/users', controllers.users.index);
app.get('/api/users/:username/bows', controllers.userBows.index);
app.get('/api/users/:username/bows/:date', controllers.userBows.show);

app.delete('/api/users/:username/bows/:id', controllers.userBows.destroy);
app.post('/api/users/:username/bows', controllers.userBows.create);
app.put('/api/users/:username/bows/:id', controllers.userBows.update);


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
