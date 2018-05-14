const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/users');

//let User = require('../models/user.js');


router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect:'/lobby',
        failureRedirect:'/',
        failureFlash: true
    })(req, res, next);
});

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
    User.create(email, password, name)
        .then(id => {
            console.log("User created log in: ", email);
            request.flash('success','You are now registered and can log in');
            response.redirect('/')
        })
        .catch(error => {
            console.log(error);
            response.redirect('/failbot');
        });
});

module.exports = router;rts = router;