const db = require('./index');



//NEW GAME
const CREATE_GAME =
    'INSERT INTO games (chatID,drawID, discardID) VALUES (${chat},${draw},${discard}) RETURNING id';
const create = (chat,draw,discard,cb) => {
    db
        .one(CREATE_GAME,{chat,draw,discard})
        .then(gameID =>
            cd(gameID.id));
};

//add player
const ADD_PLAYER =
    'INSERT INTO games-users (gameID,playerID,owner,dealer) VALUES (${gameID},${playerID},${owner},${dealer}) RETURNING playerID, gameID';

const addPlayer = (userID,gameID,isOwner,isDealer) =>{
    db.one(ADD_USER, {userID,gameID,isOwner,isDealer} );
};

//remove player
const REMOVE_PLAYER =
    'DELETE FROM games-users WHERE playerID = ${playerID}';

const removePlayer = (playerID) =>{
    db.one(REMOVE_PLAYER,{playerID});
};

//get owner
const GET_OWNER =
    'SELECT playerID FROM games_users WHERE gameID=${gameID} AND owner = true';
const getOwner = (gameID,cb) =>
    db
        .one(GET_OWNER, { gameID })
        .then(playerID =>
            cb(playerID));

//get dealer
const GET_DEALER =
    'SELECT playerID FROM games_users WHERE gameID=${gameID} AND dealer = true';
const getDealer= (gameID,cb) =>
    db
        .one(GET_DEALER, { gameID })
        .then(playerID =>
            cb(playerID));

//change Dealer
const CHANGE_DEALER =
    'UPDATE games_users SET dealer = ${isDealer} WHERE gameID = ${gameID} AND playerID = ${playerID}';
const changeDealer = (isDealer,gameID, playerID) =>{
    db
        .one(CHANGE_DEALER, {isDealer,gameID,playerID});
};

//get draw deck
const GET_DRAW =
    'SELECT drawID FROM games WHERE gameID=${gameID}';
const getDrawDeck= (gameID,cb) =>
    db
        .one(GET_DRAW, { gameID })
        .then(drawID =>
            cb(drawID));

//get discard deck
const GET_DISCARD =
    'SELECT discardID FROM games WHERE gameID=${gameID}';
const getDiscardDeck= (gameID,cb) =>
    db
        .one(GET_DISCARD, { gameID })
        .then(playerID =>
            cb(playerID));

//get chat
const GET_CHAT =
    'SELECT chatID FROM games WHERE gameID=${gameID}';
const getChat= (gameID,cb) =>
    db
        .one(GET_CHAT, { gameID })
        .then(chatID =>
            cb(chatID));

module.exports = {
    create,
    addPlayer,
    removePlayer,
    getOwner,
    getDealer,
    changeDealer,
    getDrawDeck,
    getDiscardDeck,
    getChat
};