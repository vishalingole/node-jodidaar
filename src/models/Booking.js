const Sequelize = require("sequelize")

   module.exports = sequelize.define("booking", {

    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    clientId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    bookingDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    bookingTime: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    bookingAt: {
        type: Sequelize.ENUM('home', 'salon'),
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.ENUM('0', '1', '2'), // 0 = Pending , 1 = Complete , 2 = cancelled
        allowNull: false,
        defaultValue: '0'
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    freezeTableName: true // Model tableName will be the same as the model name
})

