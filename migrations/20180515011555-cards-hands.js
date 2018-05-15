'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cards-hands', {
            cardID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            handID: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cards-hands');
    }
};
