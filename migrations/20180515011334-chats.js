'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('chats', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            gameID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique:true
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('chats');
    }
};
