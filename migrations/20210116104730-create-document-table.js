'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('document', { 
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {                   //Id of User Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      documentType: {               //Id of Document Type Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      createdAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },
      updatedAt:{ 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('document');
  }
};
