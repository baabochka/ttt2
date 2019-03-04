var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require( 'express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tttRouter = require( './routes/ttt');
var adduserRouter = require( './routes/adduser');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ttt', tttRouter);
app.use('/adduser', adduserRouter);

// view engine setup
app.set('view engine', 'hbs');
app.set('views', './public');
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/public'
}));

module.exports = app;
