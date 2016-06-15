'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

// system loggers
var logger = require('morgan');
var log = require('./app_modules/logger')(module);

// web sessions
var session = require('express-session');

// ORM and db session store
var sequelize = require('./app_modules/sequelize').sequelize;
var SequelizeStore = require('connect-session-sequelize')(session.Store);

// config
var config = require('./app_modules/config');

// Express routes
var routes = {
    index: require('./routes/main')
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/app_components', express.static(path.join(__dirname, 'app_components')));
app.use('/app_modules', express.static(path.join(__dirname, 'app_modules')));


// setup sessions
app.use(session({
    genid: function () {
        return uuid.v1();
    },
    secret: 'ikff',
    resave: false,
    saveUninitialized: false,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000,  // The maximum age (in milliseconds) of a valid session.
    store: new SequelizeStore({
        db: sequelize
    })
}));
sequelize.sync();//({force:true});

// use routes
app.use('/', routes.index);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
