const express = require("express");
const userController = express.Router();
// const authenticateJWT = require("../src/middleware/authenticateJWT");
const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_KEY;
const refreshTokenSecret = process.env.JWT_KEY;
const refreshTokens = [];
const userModel = require("../src/models/User");
const userDetailModel = require("../src/models/UserDetail");

var userService = require("../src/services/userService");
const Sequelize = require("sequelize");
const OtpModel = require("../src/models/Otp");
const User = require("../src/models/User");
const PersonalDetails = require("../src/models/PersonalDetails");
const Address = require("../src/models/Address");
const EducationalProfessionalDetails = require("../src/models/EducationalProfessionalDetails");
const Expectations = require("../src/models/Expectations");
const FamilyBackground = require("../src/models/FamilyBackground");
const HoroscopeDetails = require("../src/models/HoroscopeDetails");
const fs = require("fs");

userController.get("/", async function (request, response) {});

userController.post("/login", async function (request, response) {
  console.log(request.files);
  console.log(request.body);
  const mobile = request.body.mobile;
  userModel
    .findOne({
      where: {
        mobile: mobile,
      },
    })
    .then(async (client) => {
      console.log(client);
      if (client) {
        userService.sendOTP(mobile).then((data) => {
          response.json({
            id: client.uuid,
            statusCode: 200,
            status: "success",
            message: "OTP sent successfully.",
          });
        });
      } else {
        response.json({
          statusCode: 404,
          status: "failed",
          message: "No account is associated with this mobile number.",
        });
      }
    })
    .catch((err) => {
      response.json({
        status: "failed",
        ...err,
      });
    });
});

userController.post("/verify-otp", async function (request, response) {
  const mobile = request.body.mobile;
  const otp = request.body.otp;
  const id = request.body.uuid;
  const userInfo = userService.verifyOTP(mobile, otp).then((data) => {
    if (data != null) {
      console.log("User logged In.");
      const accessToken = jwt.sign({ username: mobile }, accessTokenSecret, {
        expiresIn: "5h",
      });
      const refreshToken = jwt.sign({ username: mobile }, refreshTokenSecret, {
        expiresIn: "5h",
      });

      refreshTokens.push(refreshToken);

      response.json({
        statusCode: 200,
        status: "success",
        message: "Logged In successfully.",
        accessToken,
        refreshToken,
        id: data.uuid,
      });
    } else {
      response.json({
        statusCode: 404,
        status: "failed",
        message: "Please enter correct OTP.",
      });
    }
  });
});

userController.get("/profile-detail", async function (request, response) {
  const profileId = request.query.profileId;
  return userService.getProfile(profileId).then((data) => response.json(data));

  console.log(profileId);
  User.findByPk(profileId, {
    include: [
      {
        model: PersonalDetails,
        as: "PersonalDetails",
        raw: true,
        attributes: {
          exclude: ["id", "firstName", "middleName", "createdAt", "updatedAt"],
        },
      },
      {
        model: Address,
        as: "Address",
        raw: true,
        attributes: {
          exclude: [
            "id",
            "idType",
            "idDetails",
            "alternateMobile",
            "updatedAt",
            "alternateEmail",
            "createdAt",
          ],
        },
      },
      {
        model: EducationalProfessionalDetails,
        as: "EducationDetails",
        raw: true,
        attributes: {
          exclude: ["id", "updatedAt", "createdAt"],
        },
      },
      {
        model: Expectations,
        as: "Expectations",
        raw: true,
        attributes: {
          exclude: ["id", "updatedAt", "createdAt"],
        },
      },
      {
        model: FamilyBackground,
        as: "FamilyBackground",
        raw: true,
        attributes: {
          exclude: ["id", "updatedAt", "createdAt"],
        },
      },
      {
        model: HoroscopeDetails,
        as: "HoroscopeDetails",
        raw: true,
        attributes: {
          exclude: ["id", "updatedAt", "createdAt"],
        },
      },
    ],
  })
    .then((user) => {
      if (!user) {
        response.status(404).json({
          message: "user not exist.",
        });
      }
      response.json({
        personalDetail: user.PersonalDetails,
        address: user.Address,
        educationDetails: user.EducationDetails,
        expectations: user.Expectations,
        familyBackground: user.FamilyBackground,
        horoscopeDetails: user.HoroscopeDetails,
      });
    })
    .catch((err) => {
      console.log(err);
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

userController.get("/get-profile-image", async function (request, response) {
  console.log(request.query.id);

  const imagePath = "public/test.jpg";
  const imageBuffer = fs.readFileSync(imagePath);
  console.log(imageBuffer);
  // Convert the image buffer to base64.
  const base64Image = imageBuffer.toString("base64");

  // Set the Content-Type header to the image type.
  response.setHeader("Content-Type", "image/jpg");

  // Send the base64 encoded image to the client.
  response.send(base64Image);
});

// userController.post(
//   "/create",
//   authenticateJWT,
//   async function (request, response) {
//     const {
//       firstName,
//       lastName,
//       gender,
//       address,
//       city,
//       categoryId,
//       accTypeId,
//       description,
//       id,
//       gstNumber,
//     } = request.body;

//     const userInfo = userService
//       .getUserId(id)
//       .then((data) => {
//         userDetailModel
//           .create({
//             firstName: firstName,
//             lastName: lastName,
//             gender: gender,
//             address: address,
//             city: city,
//             categoryId: categoryId,
//             accTypeId: accTypeId,
//             description: description,
//             userId: data.id,
//             gstNumber: gstNumber,
//           })
//           .then((user) => {
//             response.json({
//               message: "User detail Saved",
//             });
//           })
//           .catch((err) => {
//             response.json(err);
//           });
//       })
//       .catch((err) => {
//         response.json({ message: "User not found." });
//       });
//   }
// );

// userController.put(
//   "/update/:id",
//   authenticateJWT,
//   async function (request, response) {
//     response.send("UPDATE user");
//   }
// );

// userController.get("/:id", authenticateJWT, async function (request, response) {
//   response.send("get user by id");
// });

userController.get("/latest-profile", async function (request, response) {
  userService.getLatestProfile().then((data) => response.json(data));
});

userController.get("/get-profile-detail", async function (request, response) {
  console.log(request.query);

  // userService
  //   .sendProfileDetail(request.query)
  //   .then((data) => response.json(data));
  return userService
    .sendProfileDetail(request.query)
    .then((data) => response.json(data));
});

module.exports = userController;
