'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cards-decks', {
            cardID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            deckID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cardPosition: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('card-decks');
    }
};
