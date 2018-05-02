const express = require('express');
const router = express.Router();
const requireAuthentication = require('../auth/requireAuthentication');

router.get('/', function(request, response, next) {
    response.render('index');
});

router.get('/lobby', requireAuthentication, (request, response) => {
    const { user } = request;

    response.render('lobby', { user });
});

module.exports = router;