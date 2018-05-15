const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/users');
const Game = require('../db/games');
const Deck = require('../db/decks');
const Chat = require('../db/chats');
const requireAuthentication = require('../auth/requireAuthentication');

//createNewGameRoom
router.post('/',requireAuthentication, function(request, response, next){
   const userID = request.session.passport.user.id;
    Game.create(userID);
});
//start game
router.get('/:gameID', requireAuthentication, function(request, response) {
    response.render('game');
});

//join player to game

module.exports = router;