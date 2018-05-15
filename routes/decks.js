const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../db/users');
const Game = require('../db/games');
const Deck = require('../db/decks');


router.get('/test',(request,response) => {
    Deck.create((deckID) => {
        console.log('test createdDeck : ', deckID);
    });
    response.redirect('../lobby');
});
module.exports = router;