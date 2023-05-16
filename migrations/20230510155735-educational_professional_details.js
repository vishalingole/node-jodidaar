"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("educational_professional_details", {
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
      occupationDetails: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("educational_professional_details");
  },
};
