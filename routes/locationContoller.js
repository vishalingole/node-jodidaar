const express = require("express");
const router = express.Router();
const StateList = require("../src/models/StateList");

router.get("/get-state-list", function (request, response) {
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
