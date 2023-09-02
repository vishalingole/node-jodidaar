const express = require("express");
const serchController = express.Router();
const authenticateJWT = require("../src/middleware/authenticateJWT");
const jwt = require("jsonwebtoken");
const PersonalDetails = require("../src/models/PersonalDetails");
const Address = require("../src/models/Address");
const accessTokenSecret = process.env.JWT_KEY;
const refreshTokenSecret = process.env.JWT_KEY;
const refreshTokens = [];
const fs = require("fs");
const ProfileImage = require("../src/models/ProfileImage");
const User = require("../src/models/User");
const globalMethods = require("../src/globalMethods");
const EducationalProfessionalDetails = require("../src/models/EducationalProfessionalDetails");

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

serchController.get("/", async function (request, response) {
  console.log("+++", request.query);
  console.log(request.query);
  const {
    height = "",
    educationArea = "",
    gender = "",
    maritialStatus = "",
    nativeDistrict = "",
    occupationPlace = "",
    occupationType = "",
  } = request.query;

  console.log(request.query);

  let personDetail = {
    height: height,
    maritialStatus: maritialStatus,
    gender: gender,
  };

  let educationalDetail = {
    // educationArea: educationArea,
    // occupationPlace: occupationPlace,
    occupationType: occupationType,
  };

  let personDetailFilters = globalMethods.cleanObject(personDetail);
  let educationalDetailFilters = globalMethods.cleanObject(educationalDetail);
  let page = 0;
  let limit = 10;

  console.log(educationalDetailFilters);

  PersonalDetails.findAndCountAll({
    where: {
      ...personDetailFilters,
    },
    include: [
      {
        model: User,
        as: "User",
        attributes: {
          exclude: [
            "id",
            "mobile",
            "updatedAt",
            "createdAt",
            "isActive",
            "email",
            "uuid",
          ],
        },
        include: [
          {
            model: ProfileImage,
            as: "ProfileImage",
            attributes: {
              exclude: ["id", "updatedAt", "createdAt", "userId"],
            },
          },
          {
            model: EducationalProfessionalDetails,
            as: "EducationDetails",
            attributes: {
              exclude: ["id", "updatedAt", "createdAt", "userId"],
            },
          },
        ],
      },
    ],
    order: [["id", "DESC"]],
    attributes: { exclude: ["id", "firstName", "middleName"] },
    offset: page,
    limit: limit,
    raw: true,
    nest: true,
  })
    .then((users) => {
      console.log(typeof users);
      const cloneObj = Object.assign({}, users);

      const test = cloneObj.rows.map((item) => {
        if (item.User.ProfileImage && item.User.ProfileImage.fileName != null) {
          console.log(item.User.ProfileImage);
          // const imagePath = "public/test.jpg";
          const imagePath = item.User.ProfileImage.fileName;
          const imageBuffer = fs.readFileSync(imagePath);
          console.log(imageBuffer);
          // Convert the image buffer to base64.
          const base64Image = imageBuffer.toString("base64");
          // Set the Content-Type header to the image type.
          // response.setHeader("Content-Type", "image/jpg");
          item.file = base64Image;
          return item;
        }
        return item;
      });

      const data = getPagingData(cloneObj, page, limit);

      response.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = serchController;
