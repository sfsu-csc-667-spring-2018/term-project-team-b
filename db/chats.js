const db = require('./index');

//CREATE DECK
const CREATE_CHAT=
    'INSERT INTO chats DEFAULT VALUES RETURN id';
const create = (cb) => {
    db.one(CREATE_CHAT)
        .then(chatID =>
           cb(chatID) )
        .catch(error => console.log('error!', error))
};

module.exports = {
    create
};
