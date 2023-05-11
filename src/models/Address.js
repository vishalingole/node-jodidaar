const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "address",
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
    idDetails: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    idType: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    residenceAddress: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    alternateMobile: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    alternateEmail: {
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
