'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('games', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            playerCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            },
            inGame: {
                type: Sequelize.BOOL,
                allowNull: false,
                defaultValue: false
            },
            chatID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            deckID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            discardID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('games');
    }
};
