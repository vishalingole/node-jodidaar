const Sequelize = require("sequelize")

module.exports = sequelize.define("staff", {

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
	aadhar: {
		type: Sequelize.STRING(55),
		allowNull: false
	},
	designation: {
        type: Sequelize.STRING(255),
	},
	fbUrl: {
        type: Sequelize.STRING(255),
	},
	image: {
        type: Sequelize.STRING(55),
        allowNull: false
	},
	gender: {
		type: Sequelize.ENUM('male', 'female', 'other'),
		allowNull: false
	},
	email: {
		type: Sequelize.STRING(55),
		allowNull: false,
		unique: true
	},
	mobile: {
		type: Sequelize.BIGINT,
		unique: true,
		allowNull: false,
	},
	address: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	city: {
		type: Sequelize.STRING(55),
		allowNull: true
	},
	experiance: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
	},
	designation: {
		type: Sequelize.STRING(55),
		allowNull: true
	},
	salary: {
		type: Sequelize.STRING(55),
		allowNull: true
	},
	description: {
        type: Sequelize.TEXT,
        allowNull: false
	},
	createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

    updatedAt:{ type: Sequelize.DATE, defaultValue: Sequelize.NOW },
}, {
	freezeTableName: true // Model tableName will be the same as the model name
  })