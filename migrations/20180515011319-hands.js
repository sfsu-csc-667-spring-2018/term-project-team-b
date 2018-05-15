'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('hands', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            gameID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            userID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cardCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('hands');
    }
};
