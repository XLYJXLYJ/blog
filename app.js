var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");

var index = require('./routes/home/index');
var context = require('./routes/home/context');
var admin = require('./routes/admin/admin');
var addcats = require('./routes/admin/addcats');
var showcats = require('./routes/admin/showcats');
var editcats= require('./routes/admin/editcats');

var app = express();

function checkLogin(req,res,next){
  if(!req.session.isLogin){
    res.redirect('/admin/admin');
  }
  next();
}

app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/home')));
app.use(express.static(path.join(__dirname, 'public/admin')));

app.use('/', index);
app.use('/home/context', context);

app.use('/admin/admin',admin);
app.use('/admin/addcats', checkLogin);
app.use('/admin/addcats', addcats);

app.use('/admin/showcats', checkLogin);
app.use('/admin/showcats', showcats);

app.use('/admin/editcats', checkLogin);
app.use('/admin/editcats', editcats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index');
});



module.exports = app;
