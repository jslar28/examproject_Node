var app = require('../app');
var debug = require('debug')('examproject:server');
var http = require('http');
var socket = require('socket.io');
var session = require('client-sessions');
const database = require('../public/javascripts/databaseQueries');


// Get port and store it in Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.
var server = http.createServer(app);

// Listen on port
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Socket setup
var io = socket(server);
io.on('connection', (socket) => {
    console.log('Made socket connection (socket setup): ', socket.id);
    socket.join("test");
    socket.on('chat', (data) => {
      io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data);
    })

    socket.on('userLoggedIn', (data) => {
      console.log('Caught it here!')
    })
})

// Require routes
var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var sittersRouter = require('../routes/sitters');
var chatRouter = require('../routes/chat');
var registerRouter = require('../routes/register');
var loginRouter = require('../routes/login');

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

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports.emitLogin = function emitLogin(data){
  console.log("Called emitLogin in www.js")
  io.emit('userLoggedIn', data);
};
