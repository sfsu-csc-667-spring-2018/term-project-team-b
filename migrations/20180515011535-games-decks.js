'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('games-decks', {
            gameID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            deckID: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('games-decks');
    }
};
