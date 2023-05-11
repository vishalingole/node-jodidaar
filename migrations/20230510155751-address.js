"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("address", {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
