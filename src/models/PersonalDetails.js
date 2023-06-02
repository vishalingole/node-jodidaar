const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "personal_details",
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
    displayId: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    subCaste: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    height: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    bloodGroup: {
      type: Sequelize.STRING(10),
      allowNull: true,
    },
    physicalDisablities: {
      type: Sequelize.ENUM("0", "1"), // 0 = Inactive and 1 = Active
      allowNull: false,
      defaultValue: "0",
    },
    physicalDisablitiesDetails: {
      type: Sequelize.STRING(100), // 0 = Inactive and 1 = Active
      allowNull: true,
    },
    lens: {
      type: Sequelize.ENUM("0", "1"), // 0 = Inactive and 1 = Active
      allowNull: false,
      defaultValue: "0",
    },
    spectacles: {
      type: Sequelize.ENUM("0", "1"), // 0 = Inactive and 1 = Active
      allowNull: false,
      defaultValue: "0",
    },
    diet: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    gender: {
      type: Sequelize.ENUM("Male", "Female"), // 0 = Inactive and 1 = Active
      allowNull: false,
    },
    dob: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    maritialStatus: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    weight: {
      type: Sequelize.INTEGER(20),
      allowNull: true,
    },
    complexion: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
    personality: {
      type: Sequelize.STRING(20),
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
