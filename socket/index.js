const socketIO = require('socket.io');

const{ USER_JOINED, MESSAGE_SEND } = require('../events/events');
const{ Games } = require('../db');
const{ Cards } = require('../db');
const{ GameCards } = require('../db');

const socketPlayers = [];

const init = (app, server) => {
    const io = socketIO(server)

    app.set('io', io)

    io.on('connection', socket => {
        console.log('client connected ')

        socket.on('disconnect', data => {
            console.log('client disconnected')
        })

        socket.on(USER_JOINED, data => io.emit(USER_JOINED, data ))
        socket.on(MESSAGE_SEND, data => io.emit(MESSAGE_SEND, data))

        socket.on('join game', function(userData, gameData, username) {
            console.log('SOCKET: ' + userData.userid + ':' + userData.username + ' joined game ' + userData.gameid)

            var found = false;
            socketPlayers.forEach(function(index) {
                if(index == username) {
                    found = true;
                }
            })

            if(found == false) {
                socketPlayers.push(username);
            }

            socketPlayers.forEach(function(index) {
                console.log('SOCKET PLAYERS: ' + index);
            })

            io.emit('update_players', socketPlayers);

            Games.getTopCard(gameData.gameid).then(games => {
                tmpcard = games.top_card;
                Cards.find(tmpcard)
                    .then(topcard = {
                        console.log('TOP CARD: ' + topcard.id);
                        socket.emit('init_topcard', topcard);
                    })
            })
        })

        socket.on('draw card', function(userData) {
            console.log(userData.username + " drew a card")

            GameCards.drawCardByPlayerId(userData.userid, userData.gameid)
                .then(gamecards => {
                    Cards.find(gamecards.card_id)
                        .then(cardpaths => {
                            socket.emit('draw_card', gamecards, cardpaths);
                            console.log(cardpaths);
                        })
                    console.log(gamecards.card_id);
                })
                .catch(err => {
                    console.log(err)
                })
        })
        socket.on('play_card', function(userData) {
            GameCards.playCard(gameid, userData.userid, INSERT_CARD_ID).then(card => {
                console.log('Player card id: ', card.card_id)
                Games.setTopCard(gameid, card.card_id).then(topcard => {
                    console.log('Top card set to id: ', card.card_id)
                })
                Cards.getCardImg(card.card_id).then(cardpaths => {
                    socket.emit('draw_top_card', card, cardpaths)
                })
            })
                .catch(err => {
                    console.log(err)
                })
        })
        socket.on('reset', function(gameData) {
            var numCardsInDeck
            GameCards.getNumCardsInDeck(gameData.gameid).then(results => {
                numCardsInDeck = results[0].num
                console.log('There are ' + numCardsInDeck + ' cards left.')
                if(numCardsInDeck == 1) {
                    GameCards.reset(gameData.gameid)
                    console.log('Discard pile reshuffled into deck')
                }
            })
        })
        socket.on('update_gameData', function(gameData) {
            console.log('updating game data..');
            console.log(gameData.currentPlayerTurn);

            socket.broadcast.emit('update_gameData2', gameData);
        })

        socket.on('end_game', function(gameData) {
            Games.delete(gameData.gameid).then(() => {
                console.log('Game id: ' + gameData.gameid + ' has been deleted')
            })
        })
        socket.on('uno called', function(msg) {
            socket.emit('uno_msg', msg);
        })
    })
}

module.exports = {init}
