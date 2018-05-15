'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('decks', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            cardCount: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('decks');
    }
};
