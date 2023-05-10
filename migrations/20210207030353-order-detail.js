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
    orderId: {           // Id of order table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    productId: { // Id of product table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER(11),
    },
    productQuantity: {
        type: Sequelize.INTEGER(11),
        allowNull: false
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('order');
  }
};
