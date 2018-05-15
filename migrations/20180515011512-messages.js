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
            date:{
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.Date.now()
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('messages');
    }
};
