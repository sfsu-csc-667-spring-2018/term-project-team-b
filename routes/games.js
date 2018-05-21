const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/users');
const Game = require('../db/games');
const Deck = require('../db/decks');
const Chat = require('../db/chats');
const requireAuthentication = require('../auth/requireAuthentication');

//createNewGameRoom
router.get('/create',requireAuthentication, function(request, response, next){
    console.log("Create Game");
    Chat.create((chatID) => {
        console.log("chatID: ",chatID)
    });
    Deck.create((discardID) => {
        console.log("discardID: ",discardID)
    });
    Chat.create((drawID) => {
        console.log("drawID: ",drawID)
    });
    response.render('game');
});
//start game
router.get('/:gameID', requireAuthentication, function(request, response) {

    response.render('game');
});
//
//join player to game

module.exports = router;