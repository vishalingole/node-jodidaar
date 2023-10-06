const express = require("express");
const locationController = express.Router();
const StateList = require("../src/models/StateList");
const DistrictList = require("../src/models/DistrictList");

locationController.get("/get-state-list", async function (request, response) {
  StateList.findAll()
    .then((data) => {
      console.log(data);
      response.json(data);
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving state-list.",
      });
    });
});

locationController.get(
  "/get-district-list",
  async function (request, response) {
    DistrictList.findAll({
      attributes: ["id", ["city_name", "lable"], ["city_name", "value"]],
      raw: true,
    })
      .then((data) => {
        console.log(data);
        response.json(data);
      })
      .catch((err) => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving state-list.",
        });
      });
  }
);

module.exports = locationController;
