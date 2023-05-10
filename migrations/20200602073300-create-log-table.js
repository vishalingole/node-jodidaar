'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('logs', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      requestName: {
        type: Sequelize.STRING(55),
        allowNull: false
      },
      request: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      response: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      responseCode: {
        type: Sequelize.STRING(55),
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
  
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.dropTable('logs');
  }
};
