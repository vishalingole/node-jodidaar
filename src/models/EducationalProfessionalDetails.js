const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "educational_professional_details",
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
    educationArea: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    education: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    occupationType: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    occupationDetail: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    // occupationPlace: {
    //   type: Sequelize.STRING(50),
    //   allowNull: true,
    // },
    income: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    incomeType: {
      type: Sequelize.ENUM("Monthly", "Annual"), // 0 = Inactive and 1 = Active
      allowNull: false,
      defaultValue: "Annual",
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
