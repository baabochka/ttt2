var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require( 'express-handlebars');

const mongoose = require('mongoose');
const session = require('express-session');
const Mongoose = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/tictactoe');
const mongoStore = new Mongoose({mongooseConnection: mongoose.connection});

module.exports = mongoStore;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tttRouter = require( './routes/ttt');
var adduserRouter = require( './routes/adduser');
var verifyRouter = require( './routes/verify');
var loginRouter = require( './routes/login');
var logoutRouter = require( './routes/logout');
var getgameRouter = require( './routes/getgame');
var getscoreRouter = require( './routes/getscore');
var listgamesRouter = require( './routes/listgames');
// var playRouter = require( './routes/play');

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
app.use('/verify', verifyRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/verify', verifyRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// app.use('/play', playRouter);

// view engine setup
app.set('view engine', 'hbs');
app.set('views', './public');
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/public'
}));


module.exports = app;


