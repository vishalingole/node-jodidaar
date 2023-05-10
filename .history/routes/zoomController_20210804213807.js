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
    const userId = request.params.id
    zoomApi.get(`https://api.zoom.us/v2/users/${userId}/webinars`, { page_size: 100 })
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving webinars."
            });
        });
})

zoomController.get('/webinar/participants/:id', async function (request, response) {
    const webinarId = request.params.id
    zoomApi.get(`https://api.zoom.us/v2/metrics/webinars/${webinarId}/participants`, { page_size: 300, type: 'past' })
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving webinars."
            });
        });
})

zoomController.get('/webinar/participants/:id', async function (request, response) {
    const webinarId = request.params.id
    zoomApi.get(`https://api.zoom.us/v2/metrics/webinars/${webinarId}/registrants`, { page_size: 300 })
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving webinars."
            });
        });
})

zoomController.get('/meetings/:id', async function (request, response) {
    const userId = request.params.id
    zoomApi.get(`https://api.zoom.us/v2/users/${userId}/meetings`)
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving meetings."
            });
        });
})




module.exports = zoomController