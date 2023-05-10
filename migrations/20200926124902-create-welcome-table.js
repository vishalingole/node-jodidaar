'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('welcome', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            heading: {
              type: Sequelize.STRING(255),
              allowNull: false
            },
            description: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            youtubeUrl: {
              type: Sequelize.STRING(255),
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
        });

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('welcome');
    }
};