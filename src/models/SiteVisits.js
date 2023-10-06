const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "site_visits",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    latitude: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    longitude: {
      type: Sequelize.STRING(50),
      allowNull: true,
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
