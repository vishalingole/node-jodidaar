'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('user_account_type', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(55),
        allowNull: false,
        unique: true
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

    await queryInterface.bulkInsert('user_account_type', [{
      name: 'Retailer',
      createdAt: new Date(), 
      updatedAt: new Date()
   }, {
     name: 'Wholesaler',
      createdAt: new Date(), 
      updatedAt: new Date()
   }, {
     name: 'Distributor',
     createdAt: new Date(), 
     updatedAt: new Date()
   }, {
     name: 'Manufacturer',
     createdAt: new Date(), 
     updatedAt: new Date()
   }, {
     name: 'Brand',
     createdAt: new Date(), 
     updatedAt: new Date()
   }, {
     name: 'Agent',
     createdAt: new Date(), 
     updatedAt: new Date()
   }
 ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_account_type');
  }
};
