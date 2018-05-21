const express = require('express');
const app = express;
const router = express.Router();
const requireAuthentication = require('../auth/requireAuthentication');

router.get('/', (request, response) =>{
    response.render('index');
});

router.get('/lobby', requireAuthentication,(request , response) =>{
   const user = request.user;

    response.render('lobby',{user});
});



router.get('/register', (request, response) => {
    response.render('register');
});

router.get('/game', requireAuthentication ,(request, response) => {
    response.render('game');
});

module.exports = router;