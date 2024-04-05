const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "operator_info",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    middleName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female"), // 0 = Inactive and 1 = Active
      allowNull: false,
    },
    aadharNumber: {
      type: Sequelize.STRING(50),
    },
    address: {
      type: Sequelize.TEXT,
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
