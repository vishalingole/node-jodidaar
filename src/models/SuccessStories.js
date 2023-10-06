const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "success_stories",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    groomId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    brideId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    fileName: {
      type: Sequelize.STRING(100),
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
