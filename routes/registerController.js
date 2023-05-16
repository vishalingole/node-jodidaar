const express = require("express");
const registerController = express.Router();
const authenticateJWT = require("../src/middleware/authenticateJWT");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_KEY;
const refreshTokenSecret = process.env.JWT_KEY;
const refreshTokens = [];
const userModel = require("../src/models/User");
const PersonalDetails = require("../src/models/PersonalDetails");
const AddressModel = require("../src/models/Address");
const EducationalDetailsModel = require("../src/models/EducationalProfessionalDetails");
const FamilyBackgroundModel = require("../src/models/FamilyBackground");
const HoroscopeDetailsModel = require("../src/models/HoroscopeDetails");
const ExpectationsModel = require("../src/models/Expectations");

registerController.post("/", async function (request, response) {
  console.log(request.body);
  console.log("called");

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

      AddressModel.create({ ...request.body, userId: data.id });
      ExpectationsModel.create({ ...request.body, userId: data.id }).catch(
        (e) => {
          console.log(e.message);
        }
      );
      FamilyBackgroundModel.create({ ...request.body, userId: data.id });
      HoroscopeDetailsModel.create({ ...request.body, userId: data.id });
      EducationalDetailsModel.create({ ...request.body, userId: data.id });
      PersonalDetails.create({ ...request.body, userId: data.id }).then(
        (data) => {
          refreshTokens.push(refreshToken);

          response.json({
            accessToken,
            refreshToken,
            id: data.uuid,
          });
        }
      );
    })
    .catch((err) => {
      console.log(err.message);
      // throw new Error(err.message);
      response.json(err);
    });
});

module.exports = registerController;
