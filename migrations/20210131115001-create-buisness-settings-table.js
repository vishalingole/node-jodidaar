'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {

		await queryInterface.createTable('buisness_settings', {
			id: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
      },
			userId: { //Id of User Table
				type: Sequelize.INTEGER(11),
				allowNull: false,
      },
      PAN: {
        type: Sequelize.STRING(55),
        allowNull: true
      },
      gstNumber: {
        type: Sequelize.STRING(55),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(55),
        allowNull: true
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
      updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			},
		})
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable('buisness_settings');
	}
};