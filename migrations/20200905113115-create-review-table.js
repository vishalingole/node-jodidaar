'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('review', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            clientId: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            description: {
              type: Sequelize.TEXT,
              allowNull: false
            },
            rating: {
              type: Sequelize.INTEGER(11),
            },
            status: {
              type: Sequelize.ENUM('0', '1'), // 0 = Active and 1 = Inactive
              allowNull: false,
              defaultValue: '0'
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
        return queryInterface.dropTable('review');
    }
};