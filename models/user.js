'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

            name:DataTypes.STRING,
            email:DataTypes.STRING,
            hash:DataTypes.STRING,
            wins:DataTypes.INTEGER,
            loses:DataTypes.INTEGER,
            games_played:DataTypes.INTEGER
        }
        , {});
    Users.associate = function(models) {
        // associations can be defined here
    };
    return User;
};