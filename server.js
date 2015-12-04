// set up server
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// set up express
var app = module.exports = express(); // make it easy to test
var port = process.env.PORT || 3000
app.set('port', port);

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(express.static('public')); // serve the static files

// required for passport
app.use(session({
    secret: 'line'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages by passport

// set up router
var webRouter = require('./routes/web');
var api = require('./routes/api');
var auth = require('./routes/auth');

app.use('/api', api); // match the api url with a prefix '/api'
app.use('/auth', auth); // match the authentication url
app.use('/', webRouter);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});