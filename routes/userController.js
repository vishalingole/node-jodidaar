const express = require("express");
const userController = express.Router();
const authenticateJWT = require("../src/middleware/authenticateJWT");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_KEY;
const refreshTokenSecret = process.env.JWT_KEY;
const refreshTokens = [];
const userModel = require("../src/models/User");
const userDetailModel = require("../src/models/UserDetail");

var userService = require("../src/services/userService");
const Sequelize = require("sequelize");

userController.get("/", async function (request, response) {});

userController.post("/login", async function (request, response) {
  const mobile = request.body.mobile;
  userModel
    .findOne({
      where: {
        mobile: mobile,
      },
    })
    .then(async (client) => {
      console.log("User logged in");
      const accessToken = jwt.sign({ username: mobile }, accessTokenSecret, {
        expiresIn: "5h",
      });
      const refreshToken = jwt.sign({ username: mobile }, refreshTokenSecret, {
        expiresIn: "5h",
      });

      refreshTokens.push(refreshToken);

      response.json({
        accessToken,
        refreshToken,
        id: client.uuid,
      });
    })
    .catch((err) => {
      console.log(err);
      //   response.json(err);
    });
});

userController.post("/stepOne", async function (request, response) {
  console.log("++", request.body);
  const mobile = request.body.mobile;

  userModel
    .create(request.body)
    .then((data) => {
      console.log("User Created");
      const accessToken = jwt.sign({ username: mobile }, accessTokenSecret, {
        expiresIn: "5h",
      });
      const refreshToken = jwt.sign({ username: mobile }, refreshTokenSecret, {
        expiresIn: "5h",
      });

      refreshTokens.push(refreshToken);

      response.json({
        accessToken,
        refreshToken,
        id: data.uuid,
      });
    })
    .catch((err) => {
      console.log(err);
      //   throw new Error(err.message);
      response.json(err);
    });
});

userController.post(
  "/create",
  authenticateJWT,
  async function (request, response) {
    const {
      firstName,
      lastName,
      gender,
      address,
      city,
      categoryId,
      accTypeId,
      description,
      id,
      gstNumber,
    } = request.body;

    const userInfo = userService
      .getUserId(id)
      .then((data) => {
        userDetailModel
          .create({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            address: address,
            city: city,
            categoryId: categoryId,
            accTypeId: accTypeId,
            description: description,
            userId: data.id,
            gstNumber: gstNumber,
          })
          .then((user) => {
            response.json({
              message: "User detail Saved",
            });
          })
          .catch((err) => {
            response.json(err);
          });
      })
      .catch((err) => {
        response.json({ message: "User not found." });
      });
  }
);

userController.put(
  "/update/:id",
  authenticateJWT,
  async function (request, response) {
    response.send("UPDATE user");
  }
);

userController.get("/:id", authenticateJWT, async function (request, response) {
  response.send("get user by id");
});

module.exports = userController;
