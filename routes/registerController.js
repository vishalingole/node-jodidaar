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
// const transporter = require("../src/mailer");
const logger = require("../src/logger");
const handlebars = require("handlebars");
const twilioApi = require("../src/twilio-api");
const upload = require("../src/upload");
const ProfileImage = require("../src/models/ProfileImage");

let mailOptions = {
  from: "apideveloper1991@gmail.com",
  // to: "vishal.ingole3@gmail.com",
  to: "vishal.ingole3@gmail.com",
  subject: "New User Registered",
  text: "Hey XYZ, New user register please check",
};

registerController.post(
  "/user/personal-detail",
  async function (request, response) {
    console.log(request.body);
    const mobile = request.body.mobile;

    // twilioApi.data
    //   .watsupMessage(
    //     "whatsapp:",
    //     "Welcome to JodiDaar . Please enter four digit code for authentication. 5487"
    //   )
    //   .then((data) => {

    userModel
      .create(request.body)
      .then((data) => {
        console.log("User Created");
        let displayId =
          request.body.gender && request.body.gender == "Male"
            ? `G${data.id}`
            : `B${data.id}`;
        PersonalDetails.create({
          ...request.body,
          userId: data.id,
          displayId: displayId,
        }).then((data) => {
          response.json({
            status: "SUCCESS",
            message: "Personal Detail Added successfully.",
            id: data.id,
          });
        });
      })
      .catch((error) => response.json(error));

    //     .catch((error) => {
    //       twilioApi.data.sendSMS(
    //         // "+",
    //         "Welcome to JodiDaar . Please enter four digit code for authentication. 5487"
    //       );
    //     });
  }
);

registerController.post(
  "/profileimage",
  upload.single("file"),
  function (request, response) {
    // const userId = request.body.id;
    console.log(request.file);
    request.body.fileName = request.file.path;
    console.log(request.body);
    console.log(request.body.userId);
    ProfileImage.create({
      userId: request.body.userId,
      fileName: request.file.path,
    });
  }
);

registerController.post(
  "/user/education-detail",
  async function (request, response) {
    const userId = request.body.id;
    EducationalDetailsModel.create({ ...request.body, userId: userId })
      .then((data) =>
        response.json({
          statusCode: 200,
          status: "success",
          message: "Education information added successfully.",
        })
      )
      .catch((err) => {
        console.log(err.message);
        response.json(err);
      });
  }
);

registerController.post(
  "/user/family-background",
  async function (request, response) {
    const userId = request.body.id;
    FamilyBackgroundModel.create({ ...request.body, userId: userId })
      .then((data) =>
        response.json({
          statusCode: 200,
          status: "success",
          message: "Family information added successfully.",
        })
      )
      .catch((err) => {
        console.log(err.message);
        response.json(err);
      });
  }
);

registerController.post("/user/address", async function (request, response) {
  const userId = request.body.id;
  AddressModel.create({ ...request.body, userId: userId })
    .then((data) =>
      response.json({
        statusCode: 200,
        status: "success",
        message: "Address information added successfully.",
      })
    )
    .catch((err) => {
      console.log(err.message);
      response.json(err);
    });
});

registerController.post(
  "/user/horoscope-detail",
  async function (request, response) {
    const userId = request.body.id;
    HoroscopeDetailsModel.create({ ...request.body, userId: userId })
      .then((data) =>
        response.json({
          statusCode: 200,
          status: "success",
          message: "Horoscope information added successfully.",
        })
      )
      .catch((err) => {
        console.log(err.message);
        response.json(err);
      });
  }
);

registerController.post(
  "/user/expectations",
  async function (request, response) {
    const userId = request.body.id;
    ExpectationsModel.create({ ...request.body, userId: userId })
      .then((data) =>
        response.json({
          statusCode: 200,
          status: "success",
          message: "Expectation information added successfully.",
        })
      )
      .catch((err) => {
        console.log(err.message);
        response.json(err);
      });
  }
);

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
      let displayId =
        request.body.gender && request.body.gender == "Male"
          ? `G${data.id}`
          : `B${data.id}`;
      PersonalDetails.create({
        ...request.body,
        userId: data.id,
        displayId: displayId,
      }).then((data) => {
        refreshTokens.push(refreshToken);
        // transporter.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });

        // logger.readHTMLFile(
        //   "C:/Users/visha/Desktop/be-jodidaar/public/pages/emailWithPDF.html",
        //   // "/var/www/node-tutorial/public/pages/emailWithPDF.html",
        //   function (err, html) {
        //     var template = handlebars.compile(html);
        //     var replacements = {
        //       name: "Vishal Ingole",
        //       body: "Welcome to Jodidaar!",
        //     };
        //     var htmlToSend = template(replacements);
        //     var mailOptions = {
        //       from: "apideveloper1991@gmail.com",
        //       to: "vishal.ingole3@gmail.com",
        //       subject: "Welcome to JodiDaar!",
        //       html: htmlToSend,
        //     };
        //     transporter.sendMail(mailOptions, function (error, response) {
        //       if (error) {
        //         console.log(error);
        //         callback(error);
        //       }
        //     });
        //   }
        // );

        response.json({
          accessToken,
          refreshToken,
          id: data.uuid,
        });
      });
    })
    .catch((err) => {
      console.log(err.message);
      // throw new Error(err.message);
      response.json(err);
    });
});

module.exports = registerController;
