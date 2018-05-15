'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('messages', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            message:{
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: Sequelize.DATE
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('messages');
    }
};
