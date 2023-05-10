const Sequelize = require("sequelize")

module.exports = sequelize.define("product", {

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
      subcategoryId: {               //Id of SubCategory Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
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