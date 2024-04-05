const express = require("express");
const bookmarkController = express.Router();
const Bookmark = require("../src/models/Bookmark");

bookmarkController.get("/bookmark-list", function (request, response) {
  const userId = request.query.userId;

  Bookmark.findAll({
    attributes: ["bookmarkTo"],
    raw: true,
    where: { userId: userId },
  })
    .then((data) => {
      console.log(data);
      const bookmarkIds = data.map((item) => item.bookmarkTo);
      console.log(bookmarkIds);
      response.json({
        statusCode: 200,
        status: "success",
        message: "List sent successfully.",
        items: bookmarkIds,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving state-list.",
      });
    });
});

//function to get bookmarked profile details
bookmarkController.get("/get-my-bookmark", function (request, response) {
  const userId = request.query.loggedInUserId;

  Bookmark.findAll({
    attributes: ["bookmarkTo"],
    raw: true,
    where: { userId: userId },
  })
    .then((data) => {
      console.log(data);
      const bookmarkIds = data.map((item) => item.bookmarkTo);
      console.log(bookmarkIds);
      response.json({
        statusCode: 200,
        status: "success",
        message: "List sent successfully.",
        items: bookmarkIds,
      });
    })
    .catch((err) => {
      response.status(500).send({
        message:
          err.message || "Some error occurred while retrieving state-list.",
      });
    });
});

bookmarkController.post("/create", async function (request, response) {
  let bookmarkBy = request.body.bookmarkBy;
  let bookmarkTo = request.body.bookmarkTo;
  Bookmark.create({
    userId: bookmarkBy,
    bookmarkTo: bookmarkTo,
  })
    .then((data) => {
      response.json({
        statusCode: 200,
        status: "success",
        message: "Bookmark successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
});

bookmarkController.post("/remove", async function (request, response) {
  let bookmarkBy = request.body.bookmarkBy;
  let bookmarkTo = request.body.bookmarkTo;

  Bookmark.destroy({
    where: {
      userId: bookmarkBy,
      bookmarkTo: bookmarkTo,
    },
  })
    .then(() => {
      response.json({
        statusCode: 200,
        status: "success",
        message: "Bookmark removed successfully.",
      });
    })
    .catch((err) => {
      console.log(err);
      response.json(err);
    });
});

module.exports = bookmarkController;
