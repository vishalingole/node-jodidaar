const express = require("express");
const serchController = express.Router();
const authenticateJWT = require("../src/middleware/authenticateJWT");
const jwt = require("jsonwebtoken");
const PersonalDetails = require("../src/models/PersonalDetails");
const Address = require("../src/models/Address");
const accessTokenSecret = process.env.JWT_KEY;
const refreshTokenSecret = process.env.JWT_KEY;
const refreshTokens = [];

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

serchController.get("/", async function (request, response) {
  console.log("+++", request.query);
  console.log(request.query);

  let page = 0;
  let limit = 3;

  PersonalDetails.findAndCountAll({
    where: {
      ...request.query,
    },
    order: [["id", "DESC"]],
    attributes: { exclude: ["id", "firstName", "middleName"] },
    offset: page,
    limit: limit,
  })
    .then((users) => {
      const data = getPagingData(users, page, limit);
      response.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = serchController;
