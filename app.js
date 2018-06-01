var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');

var app = express();

// Setup middleware
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Require routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sittersRouter = require('./routes/sitters');
var chatRouter = require('./routes/chat');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sitters', sittersRouter);
app.use('/chat', chatRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
