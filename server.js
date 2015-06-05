var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;
var staticdir = 'production' === process.env.NODE_ENV ? 'dist.prod' : 'dist.dev';

app.use(bodyParser.json());
// uncomment as needed to support other body parsers
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request in order to simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location
app.use(express.static(__dirname + '/' + staticdir));

// setup our routes
require('./server/routes')(app);

// start the app
app.listen(port);
console.log('Server started at http://localhost:' + port);  // shoutout to the user

exports = module.exports = app;
