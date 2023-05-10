const Sequelize = require("sequelize")

module.exports = sequelize.define("buisness_profile", {
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
	buisnessImage: {
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
		type: Sequelize.ENUM(true, false),
		defaultValue: false

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
}, {
	freezeTableName: true // Model tableName will be the same as the model name
})