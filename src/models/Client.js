const Sequelize = require("sequelize")

module.exports = sequelize.define("client", {

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