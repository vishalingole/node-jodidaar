'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('order', { 
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {           // Id of user table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    subtotal: {
        type: Sequelize.INTEGER(11),
    },
    total: {
        type: Sequelize.INTEGER(11),
    },
    billingAddress: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    shippingAddress: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order');
  }
};
