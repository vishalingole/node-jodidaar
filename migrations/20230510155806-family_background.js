"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("family_background", {
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
      relativesSurname: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("family_background");
  },
};
