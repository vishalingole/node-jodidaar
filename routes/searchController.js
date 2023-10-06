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
const { getSearchProfiles } = require("../src/services/userService");

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

serchController.get("/", async function (request, response) {
  const result = getSearchProfiles(request.query);

  result.then((data) => response.json(data));

  console.log("----+++", result);
  console.log("+++", request.query);
  console.log(request.query);

  console.log(request.query);
});

module.exports = serchController;
