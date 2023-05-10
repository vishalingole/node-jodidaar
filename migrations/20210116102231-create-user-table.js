'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        unique: true,
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: (Math.random() + 1).toString(36).substring(7)
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
