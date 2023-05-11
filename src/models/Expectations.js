const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "expectations",
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
    preferredCities: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    expectedCaste: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    maxAgeDiffernce: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
    expectedEducation: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    expectedOccupation: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    expectedAnnualIncome: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
    },
    divorcee: {
      type: Sequelize.ENUM("0", "1"), // 0 = No and 1 = Yes
      allowNull: false,
      defaultValue: "0",
    },
    expectedHeight: {
      type: Sequelize.FLOAT,
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
