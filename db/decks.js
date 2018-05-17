const db = require('./index');

//CREATE DECK
const CREATE_DECK =
    'INSERT INTO decks DEFAULT VALUES RETURNING id';
const create = (cb) => {
    db
        .one(CREATE_DECK)
        .then(deckID =>
                cb(deckID.id))
        .catch(error => console.log('error!', error))
};

//DESTROY DECK
const DESTROY_DECK =
    'DELETE FROM decks WHERE id = ${deckID}';
const destroy = (deckID) => {
    db
        .one(DESTROY_DECK, {deckID})
        .catch(error => console.log('error!',error));
};

//ADD CARD

//REMOVE CARD


module.exports = {
    create
};