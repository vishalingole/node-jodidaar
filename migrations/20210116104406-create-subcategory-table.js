'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.createTable('sub_category', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      categoryId: {                   //Id of Category Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(55),
        allowNull: false
      },
      subcategoryImage: {
        type: Sequelize.STRING(55),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('0', '1'), // 0 = Inactive and 1 = Active
        allowNull: false,
        defaultValue: '1'
      },
      createdAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },

      updatedAt:{ 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique: true
    },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sub_category');
  }
};
