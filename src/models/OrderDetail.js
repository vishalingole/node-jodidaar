const Sequelize = require("sequelize")

   module.exports = sequelize.define("order_detail", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    orderId: {           // Id of order table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    productId: { // Id of product table
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER(11),
    },
    productQuantity: {
        type: Sequelize.INTEGER(11),
        allowNull: false
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

