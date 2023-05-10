'use strict';

module.exports = {
	up: async(queryInterface, Sequelize) => {

		await queryInterface.createTable('buisness_profile', {
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
      profileImage: {
        type: Sequelize.STRING(55),
        allowNull: true
      },
			buisnessType: {
				type: Sequelize.STRING(20),
				allowNull: false,
				unique: true
			},
			userId: { //Id of User Table
				type: Sequelize.INTEGER(11),
				allowNull: false,
			},
			uuid: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV1,
				unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isVerified: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '0'
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
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
		})
	},

	down: async(queryInterface, Sequelize) => {
		await queryInterface.dropTable('buisness_profile');
	}
};