const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "horoscope_details",
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
    rashi: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    charan: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    gan: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    nakshatra: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    nadi: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    birthDistrict: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    birthTime: {
      type: Sequelize.TIME,
      allowNull: false,
    },
    devak: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    mangal: {
      type: Sequelize.ENUM("Yes", "No", "Saumya", "Nirdosh"), // 0 = Inactive and 1 = Active
      allowNull: false,
      defaultValue: "No",
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
