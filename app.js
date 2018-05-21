const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash  = require('connect-flash');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

if(process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

const passport = require('./auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');

const testsRouter = require('./routes/tests');


//start express app
const app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(app.get('port'));
users = [];
connections = [];
console.log("server running");
app.use(favicon(path.join(__dirname, 'public/images/', 'favicon.png')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        saveUninitialized: false,
        resave: false,
        store: new (require('connect-pg-simple')(session))(),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        }

    })
);


//authorization
app.use(passport.initialize());
app.use(passport.session());




//express messages middleware for flash messages
app.use(require('connect-flash')());
app.use(function (request,response,next) {
    response.locals.messages = require('express-messages')(request,response)
    next();
});

//express validator for forms
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split(' . '),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/games', gamesRouter);

app.use('/tests', testsRouter);

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

//sockets for testing. does not work. Other endpoint in chat.pug
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

    connections.splice(connections.indexOf(socket), 1);
    console.log("disconnected");
});

module.exports = app;
