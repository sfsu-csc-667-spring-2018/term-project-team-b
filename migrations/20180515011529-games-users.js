'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('games-users', {
            gameID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            playerID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            owner: {
                type: Sequelize.BOOL,
                allowNull: false
            },
            dealer: {
                type: Sequelize.BOOL,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('games-users');
    }
};
