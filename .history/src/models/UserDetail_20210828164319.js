const Sequelize = require("sequelize")

module.exports = sequelize.define("user_detail", {
	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	firstName: {
		type: Sequelize.STRING(55),
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING(55),
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
	profileImage: {
		type: Sequelize.STRING,
		allowNull: true
	},
	gender: {
		type: Sequelize.ENUM('male', 'female', 'other'),
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
	accTypeId: {
		type: Sequelize.INTEGER(11),
		allowNull: true,
	},
	zoomId: {
		type: Sequelize.STRING,
		allowNull: true
	},
	status: {
		type: Sequelize.ENUM('active', 'inactive'),
		allowNull: true
	  },
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
})