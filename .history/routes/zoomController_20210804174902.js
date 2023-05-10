const express = require('express')
const zoomController = express.Router();
const jwt = require('jsonwebtoken');
const zoomApi = require('../src/zoom-api')

zoomController.get('/users', async function (request, response) {

    zoomApi.get("https://api.zoom.us/v2/users/", { status: 'active' })
        .then(data => {
            response.send(data)
        })
        .catch(error => {
            response.send(error)
        })
})

zoomController.get('/webinar/:id', async function (request, response) {
    zoomApi.get(`https://api.zoom.us/v2/users/${id}/webinars`)
    .then(data => response.send(data))
    .catch(err => {
        response.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
})


module.exports = zoomController