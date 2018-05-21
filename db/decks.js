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
//GET CARD COUNT
const GET_CARD_COUNT =
    'SELECT cardCount FROM decks WHERE id=${deckID};';
const getCardCount = (deckID,cb) =>
    db
        .one(GET_CARD_COUNT, { deckID })
        .then(cardCount =>
            cb(cardCount));

//SET CARD COUNT
const SET_CARD_COUNT =
    'UPDATE decks SET cardCount = ${cardCount} WHERE id=${deckID};';
const setCardCount = (deckID,cardCount) =>
    db
        .one(SET_CARD_COUNT, { deckID,cardCount });

//ADD CARD TO DECK
const ADD_CARD =
    'INSERT INTO cards-decks (cardID,deckID,cardPosition)VALUES (${cardID},${deckID},${cardPosition})';
const addCard = (cardID,deckID,cardPosition,cb) => {
    db
        .none(ADD_CARD,{cardID,deckID,cardPosition})
        .catch(error => console.log('error!', error))
};
//REMOVE CARD FROM DECK
const REMOVE_CARD =
    'DELETE FROM cards-decks WHERE deckID = ${deckID} AND cardPosition = ${cardPosition}';
const removeCard = (deckID,cardPosition) => {
    db
        .none(REMOVE_CARD, {deckID,cardPosition})
        .catch(error => console.log('error!',error));
};
//REMOVE ALL CARDS FROM DECK
const REMOVE_ALL_CARDs =
    'DELETE FROM cards-decks WHERE deckID = ${deckID}';
const removeAllCards = (deckID) => {
    db
        .none(REMOVE_CARD, {deckID})
        .catch(error => console.log('error!',error));
};
module.exports = {
    create,
    destroy,
    getCardCount,
    setCardCount,
    addCard,
    removeCard,
    removeAllCards
};