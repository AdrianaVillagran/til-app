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

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for auth
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey', // change this!
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
app.use('/vendor', express.static(__dirname + '/bower_components'));

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

// show signup view
app.get('/signup', function (req, res) {
  res.render('signup'); // you can also use res.sendFile
});

// show login view
app.get('/login', function (req, res) {
  res.render('login'); // you can also use res.sendFile
});

/*
 * JSON Endpoints
 */

 // sign up and create new user
app.post('/signup', function (req, res) {
 var new_user = new User({ username: req.body.username });
 User.register(new_user, req.body.password,
   function (err, newUser) {
     passport.authenticate('local')(req, res, function() {
       res.redirect('/');
     });
   }
 );
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(req.user.username);
  res.redirect('/');
});

app.get('/api', controllers.api.index);
app.get('/api/bows', controllers.bow.index);
app.post('/api/bows', controllers.bow.create);
app.delete('/api/bows/:id', controllers.bow.destroy);
app.put('/api/bows/:id', controllers.bow.update);


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
