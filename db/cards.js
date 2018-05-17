const db = require('./index');

//GET CARD VALUE
const GET_CARD =
    'SELECT value FROM cards WHERE id=${cardID}';
const getCardValue = (cardID, cardValue) =>{
    db
        .one(GET_CARD, {cardID})
        .then(value =>
                cardValue(value));
};

module.exports = {
    getCardValue
};