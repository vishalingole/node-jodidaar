const Sequelize = require("sequelize")

module.exports = sequelize.define("language_preference", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {                   //Id of User Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      languageId: {                   //Id of Language Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
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
}, {
	freezeTableName: true // Model tableName will be the same as the model name
})