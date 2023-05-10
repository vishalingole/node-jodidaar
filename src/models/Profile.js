const Sequelize = require("sequelize")

module.exports = sequelize.define("profile", {
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
    email: {
        type: Sequelize.STRING(55),
        allowNull: true,
        unique: true,
        validate:{
            isEmail:{
                msg: 'Please enter valid email.'
            }
        }
    },
    profileImage: {
        type: Sequelize.STRING(55),
        allowNull: true
    },
    mobile: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    userId: { //Id of User Table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        unique: true
    }
}, {
	freezeTableName: true // Model tableName will be the same as the model name
})