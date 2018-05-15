const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../db/users');

const lookup = (email, password, done) => {
    console.log("lookup");
    User.find(email, ( user )=> {
        //console.log("found");
        if (bcrypt.compareSync(password, user.hash)){
            console.log('found player id :', user.id);
            done(null , user );
        }
        else {
            done('Please verify your email and password', false);
        }
    });
};

const strategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    lookup
);

passport.serializeUser(User.serialize);
passport.deserializeUser(User.deserialize);
passport.use(strategy);

module.exports = passport;