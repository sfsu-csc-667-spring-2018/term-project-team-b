'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('chats', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('chats');
    }
};
