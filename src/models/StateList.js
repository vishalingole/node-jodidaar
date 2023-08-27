const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "state_list",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    state: {
      unique: true,
      type: Sequelize.STRING(50),
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);
