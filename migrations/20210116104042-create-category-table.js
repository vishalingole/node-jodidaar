'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(55),
        allowNull: false
      },
      categoryImage: {
        type: Sequelize.STRING(55),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
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
    });
    return queryInterface.bulkInsert('category',  [{
      name: 'John',
      status: '1',
      categoryImage: 'abc',
      description: '',
    }], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category');
  }
};
