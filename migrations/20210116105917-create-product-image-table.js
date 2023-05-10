'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_images', { 
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      originalname: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      path: {
          type: Sequelize.STRING(255),
          allowNull: false
      },
      fileSize: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      mimeType: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      productId: {               //Id of Product Table  
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique: true
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
    await queryInterface.dropTable('product_images');
  }
};
