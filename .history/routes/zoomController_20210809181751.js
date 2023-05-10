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

zoomController.get('/user/webinar/:id', async function (request, response) {
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

zoomController.post('/webinar/registrants', async function (request, response) {
    console.log(request.body)
    const { webinarId, status } = request.body;
    zoomApi.get(`https://api.zoom.us/v2/webinars/${webinarId}/registrants`, { page_size: 300, status: status })
        .then(data => response.send(data))
        .catch(err => {
            console.log(err)
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving webinars."
            });
        });
})

zoomController.post('/webinar/create', async function (request, response) {
    console.log(request.body)
    // const { webinarId, status } = request.body;

    const payload = {
        "topic": 'Test',
        "type" : 9,
        "start_time": "",
        "duration": "60",
        "timezone":"Asia/Kolkata",
        "password": "test",
        "agenda" : "Test",
        recurrence : {
            type : "1",
            repeat_interval : 90,
            end_date_time: ""
        },

    }

    zoomApi.post(`https://api.zoom.us/v2/webinars/${webinarId}/registrants`, payload)
        .then(data => response.send(data))
        .catch(err => {
            console.log(err)
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving webinars."
            });
        });
})

zoomController.get('/webinar/:id', async function (request, response) {
    const webinarId = request.params.id
    zoomApi.get(`https://api.zoom.us/v2/webinars/${webinarId}`)
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving webinars."
            });
        });
})

zoomController.post('/meetings', async function (request, response) {
    // const userId = request.params.id
    const {userId , type } = request.body;
    zoomApi.get(`https://api.zoom.us/v2/users/${userId}/meetings`, { type : type })
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving meetings."
            });
        });
})

zoomController.get('/user/:id', async function (request, response) {
    const userId = request.params.id
    zoomApi.get(`https://api.zoom.us/v2/users/${userId}`)
        .then(data => response.send(data))
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving meetings."
            });
        });
})




module.exports = zoomController