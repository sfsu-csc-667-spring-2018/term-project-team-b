const db = require('./index');

//CREATE DECK
const CREATE_DECK =
    'INSERT INTO decks DEFAULT VALUES RETURNING id';
const create = (cb) => {
    db
        .one(CREATE_DECK)
        .then(deckID =>
                cb(deckID))
        .catch(error => console.log('error!', error))
};

module.exports = {
    create
};