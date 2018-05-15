'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('messages-chats', {
            messageID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            chatID: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('messages-chats');
    }
};
