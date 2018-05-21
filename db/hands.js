const db = require('./index');

//CREATE HAND
const CREATE_HAND =
    'INSERT INTO hands DEFAULT VALUES RETURNING id';
const create = (cb) => {
    db
        .one(CREATE_HAND)
        .then(handID =>
            cb(handID.id))
        .catch(error => console.log('error!', error))
};

//DESTROY HAND
const DESTROY_HAND =
    'DELETE FROM hands WHERE id = ${handID}';
const destroy = (handID) => {
    db
        .one(DESTROY_HAND, {handID})
        .catch(error => console.log('error!',error));
};
//GET CARD COUNT
const GET_CARD_COUNT =
    'SELECT cardCount FROM hands WHERE id=${handID};';
const getCardCount = (handID,cb) =>
    db
        .one(GET_CARD_COUNT, { handID })
        .then(cardCount =>
            cb(cardCount));

//SET CARD COUNT
const SET_CARD_COUNT =
    'UPDATE hands SET cardCount = ${cardCount} WHERE id=${handID};';
const setCardCount = (handID,cardCount) =>
    db
        .one(SET_CARD_COUNT, { handID,cardCount });

//ADD CARD TO HAND
const ADD_CARD =
    'INSERT INTO cards-hands (cardID,handID)VALUES (${cardID},${handID})';
const addCard = (cardID,handID,cb) => {
    db
        .none(ADD_CARD,{cardID,handID})
        .catch(error => console.log('error!', error))
};
//REMOVE CARD FROM HAND
const REMOVE_CARD =
    'DELETE FROM cards-hands WHERE handID = ${handID} AND cardPosition = ${cardID}';
const removeCard = (handID,cardID) => {
    db
        .none(REMOVE_CARD, {handID,cardID})
        .catch(error => console.log('error!',error));
};
//REMOVE ALL CARDS FROM HAND
const REMOVE_ALL_CARDs =
    'DELETE FROM cards-hands WHERE handID = ${handID}';
const removeAllCards = (handID) => {
    db
        .none(REMOVE_CARD, {handID})
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