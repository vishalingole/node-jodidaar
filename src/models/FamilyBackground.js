const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "family_background",
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
    father: {
      type: Sequelize.ENUM("0", "1"), // 0 = No and 1 = Yes
      allowNull: true,
      defaultValue: "1",
    },
    mother: {
      type: Sequelize.ENUM("0", "1"), // 0 = No and 1 = Yes
      allowNull: true,
      defaultValue: "1",
    },
    brother: {
      type: Sequelize.ENUM("0", "1"), // 0 = No and 1 = Yes
      allowNull: true,
      defaultValue: "0",
    },
    marriedBrother: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
    unmarriedBrother: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
    unmarriedSister: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
    sister: {
      type: Sequelize.ENUM("0", "1"), // 0 = No and 1 = Yes
      allowNull: true,
      defaultValue: "0",
    },
    marriedSister: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
    parentsFullName: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    parentsOccupation: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    parentsResidenceAddress: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    relativeSurname: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    familyWealth: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    mamasSurname: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    nativeDistrict: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    nativeTaluka: {
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
