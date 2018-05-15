const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash  = require('connect-flash');
const bodyParser = require('body-parser');

if(process.env.NODE_ENV === 'development') {
    require("dotenv").config();
}

const passport = require('./auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');

const testsRouter = require('./routes/tests');



const app = express();

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
            secure:
            process.env.ENVIRONMENT !== 'development' &&
            process.env.ENVIRONMENT !== 'test',
            maxAge: 7 * 24 * 60 * 60 * 1000
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



module.exports = app;
