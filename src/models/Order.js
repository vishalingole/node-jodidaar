const Sequelize = require("sequelize")

   module.exports = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {           // Id of user table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    subtotal: {
        type: Sequelize.INTEGER(11),
    },
    total: {
        type: Sequelize.INTEGER(11),
    },
    billingAddress: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    shippingAddress: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    statusId: {   //Id of order_status table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    freezeTableName: true // Model tableName will be the same as the model name
})

