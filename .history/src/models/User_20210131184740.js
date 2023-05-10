const Sequelize = require("sequelize")

module.exports = sequelize.define("user", {

    id: {
		type: Sequelize.INTEGER(11),
		allowNull: false,
		autoIncrement: true,
        primaryKey: true
       
	},
	mobile: {
        unique: true,
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            customValidator(value) {
              if (value.length !== 10) {
                throw new Error("Mobile number must be 10 digit.");
              }
            }
        }
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
}, {
	freezeTableName: true // Model tableName will be the same as the model name
  })