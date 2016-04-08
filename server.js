var express = require('express');
    bodyParser = require('body-parser');
    db = require('./models');


// generate a new express app and call it 'app'
var app = express();


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// We'll serve jQuery and bootstrap from a local bower cache avoiding CDNs
// We're placing these under /vendor to differentiate them from our own assets
app.use('/vendor', express.static(__dirname + '/bower_components'));

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

/*
 * JSON Endpoints
 */
app.get('/api', controllers.api.index);
app.get('/api/bows', controllers.bow.index);
app.post('/api/bows', controllers.bow.create);






// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
