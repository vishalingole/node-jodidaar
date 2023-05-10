const Sequelize = require("sequelize")

module.exports = sequelize.define("offer", {

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
	price: {
		type: Sequelize.STRING(55),
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
	status: {
		type: Sequelize.ENUM('0', '1'), // 0 = Active and 1 = Inactive
		allowNull: false,
		defaultValue: '0'
	}
}, {
	freezeTableName: true // Model tableName will be the same as the model name
})