const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "all_cities",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    city_name: {
      unique: true,
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    city_code: {
      unique: true,
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    state_code: {
      unique: true,
      type: Sequelize.STRING(50),
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
