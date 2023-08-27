const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "otp",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    mobile: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    otp: {
      type: Sequelize.INTEGER(4),
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);
