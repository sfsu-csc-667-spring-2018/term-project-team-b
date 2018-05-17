const db = require('./index');

//CREATE CHAT
const CREATE_CHAT=
    'INSERT INTO chats DEFAULT VALUES RETURNING id';
const create = (cb) => {
    db.one(CREATE_CHAT)
        .then(chatID =>
           cb(chatID.id) )
        .catch(error => console.log('error!', error))
};

//DESTROY CHAT
const DESTROY_CHAT =
    'DELETE FROM chats WHERE id = ${chatID}';
const destroy = (chatID) => {
    db
        .one(DESTROY_CHAT, {chatID})
        .catch(error => console.log('error!',error));
};


//CREATE MESSAGE
const CREATE_MESSAGE =
    'INSERT INTO messages (userID, message) VALUES (${userID}, ${message}) RETURNING id ';

const createMessage = (userID,message,cb) => {
    db
        .one(CREATE_MESSAGE,{userID,message})
        .then(messageID =>
            cb(messageID.id));
};

//DESTROY MESSAGE
const DESTROY_MESSAGE =
    'DELETE FROM messages WHERE id = ${messageID}';
const destroyMessage = (messageID) => {
    db
        .one(DESTROY_MESSAGE, {messageID})
        .catch(error => console.log('error!',error));
};
//ADD MESSAGE TO CHAT
const ADD_MESSAGE =
    'INSERT INTO messages-chats (messageID,chatID) VALUES (${messageID}, ${chatID})';

const addMessage = (messageID,chatID) => {
    db.one(ADD_MESSAGE,{messageID,chatID})
};

//DELETE ALL MESSAGES from message-chat table
const DELETE_CHAT_MESSAGES =
    'DELETE FROM messages-chats WHERE chatID = ${chatID}';
const deleteAllMessages = (chatID) =>{
    db
        .one(DELETE_CHAT_MESSAGES, {chatID})
};
module.exports = {
    create,
    destroy,
    createMessage,
    destroyMessage,
    addMessage
};
