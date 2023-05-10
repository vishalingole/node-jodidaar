const Sequelize = require("sequelize")

module.exports = sequelize.define("welcome", {

	id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	heading: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	youtubeUrl: {
		type: Sequelize.STRING(255),
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