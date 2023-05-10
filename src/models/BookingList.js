const Sequelize = require("sequelize")

module.exports = sequelize.define("booking_list", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    bookingId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    listId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    staffId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
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