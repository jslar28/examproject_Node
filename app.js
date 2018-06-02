var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var session = require('client-sessions');
const database = require('./public/javascripts/databaseQueries');
var app = express();

// Setup middleware
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'session',
  secret: 'potato',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}))

// Require routes
/*
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

app.get('/logout', (req, res) => {
  console.log("Resetting session.")
  let username = req.session.user.username;
  req.session.reset();
  database.removeByUsername("loggedInUsers", username);
  res.redirect('/');
})
*/
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Session middleware for securing the cookie
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    database.getByUsername("users", req.session.user.email, (user) => {
      if (user) {
        req.user = user;
        delete req.user.password
        req.session.user = user;
        req.locals.user = user;
      }
      next();
    });
  } else {
    next();
  }
});

function requireLogin(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// catch 404 and forward to error handler
/*
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
*/
module.exports = app;
