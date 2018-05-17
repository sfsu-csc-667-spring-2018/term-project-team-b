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
                defaultValue: 1
            },
            inGame: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            chatID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            drawID: {
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
