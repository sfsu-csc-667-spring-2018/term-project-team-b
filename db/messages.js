const db = require('./index')

const  ALL = `SELECT * FROM Messages`;
const CREATE_QUERY = `INSERT INTO Messages (game_id, user_id, message, time_stamp) VALUES ($1, $2, $3, $4 )`;
const GET_GAME_MESSAGES = 'SELECT * FROM Messages WHERE game_id=$1';
const GET_GAME_MESSAGES_PAST_TIME = 'SELECT message FROM Messages WHERE time >= timestamp';
const GET_LOBBY_MESSAGES = 'SELECT * FROM Messages WHERE game_id=0';
const GET_LOBBY_MESSAGES_PAST_TIME = 'SELECT message FROM Messages WHERE time >= time_stamp';

module.exports = {
    all: () => db.any(ALL),
    create: (game_id, user_id, message, time_stamp) => db.none(CREATE_QUERY, [game_id, user_id, message, time_stamp]),
    getGameMessages: game_id => db.any(GET_GAME_MESSAGES, game_id),
    getGameMessagesPastTime: game_id => db.any(GET_GAME_MESSAGES_PAST_TIME, game_id),
    getLobbyMessages: () => db.any(GET_LOBBY_MESSAGES),
    getLobbyMessagesPastTime: time => db.any(GET_LOBBY_MESSAGES_PAST_TIME, time),
};