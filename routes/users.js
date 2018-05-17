const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/users');
const Game = require('../db/games');
const requireAuthentication = require('../auth/requireAuthentication');

//let User = require('../models/user.js');


router.post('/login', passport.authenticate('local', {
        successRedirect:'../lobby',
        failureRedirect:'/',
        failureFlash: true
    })
);

router.get('/logout', (request, response) => {

    request.logout();
    response.redirect('../');

});

router.get('/register', (request, response) => {
    response.render('register');
});

router.post('/register', (request, response, next) => {
    const { email, password, name } = request.body;
    console.log('register', name);
    User.create(email, password, name, (id) => {
        console.log("User created log in: ", email);
        request.flash('success','You are now registered and can log in');
        /*request.login({email,password}, error => {
                if (error) {
                    return next(error);
                } else {
                    return response.redirect('/lobby');
                }
            });*/
        response.redirect('../');
    })
});

module.exports = router;rts = router;