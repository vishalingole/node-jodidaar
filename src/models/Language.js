const Sequelize = require("sequelize")

module.exports = sequelize.define("language", {
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
}, {
	freezeTableName: true // Model tableName will be the same as the model name
})