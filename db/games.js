const db = require('./index');
const decks = require('./decks');
const chats = require('./chats');
const users = require('./users');


//SETUP NEW GAME CREATE ENTITIES
//NEW GAME
const CREATE_QUERY =
    'INSERT INTO games (chat, draw, discard) VALUES (${chat},${draw},${discard}) RETURNING id';
const create = (userID) => {
    //create chat
    const newChat = chats.create();
    //create deck draw pile
    const newDraw = decks.create();
    //create deck discard pile
    const newDiscard = decks.create();
    //greate game
    const newGame = db.one(CREATE_QUERY, {newChat,newDraw,newDiscard} );
    //set owner
    addOwner(userID,newGame, true, true);

    console.log("Game Created : ", newGame);
};

//SET OWNER ->games-users
const ADD_USER =
    'INSERT INTO games-users (user,game,isOwner,isDealer) VALUES (${owner},${game},${isOwner},${isDealer}) RETURNING playerID, gameID';

const addOwner = () => db.one(CREATE_QUERY, {} );



const GET_OWNER_QUERY =
    'SELECT users.email FROM games, users WHERE games.id=${id} AND users.id=games.created_by';
const getOwner = id => db.one(GET_OWNER_QUERY, { id });

module.exports = {
    create,
    addOwner,
    getOwner
};