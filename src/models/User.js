const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      unique: true,
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        // customValidator(value) {
        //   if (value.length !== 10) {
        //     throw new Error("Mobile number must be 10 digit.");
        //   }
        // }
      },
    },
    mobile: {
      unique: true,
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    isActive: {
      type: Sequelize.ENUM("0", "1"), // 0 = Inactive and 1 = Active
      allowNull: false,
      defaultValue: "0",
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
    },
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      unique: true,
    },
  },
  {
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);
