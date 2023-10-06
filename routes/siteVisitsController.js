const express = require("express");
const SiteVisits = require("../src/models/SiteVisits");
const siteVisitsController = express.Router();

siteVisitsController.post("/", async function (request, response) {
  console.log("+++", request.body);
  const { longitude = "", latitude = "" } = request.body;
  SiteVisits.create({ longitude: longitude, latitude: latitude }).then((data) =>
    response.json({
      status: "SUCCESS",
      message: "Visits detail updated successfully.",
    })
  );
});

module.exports = siteVisitsController;
