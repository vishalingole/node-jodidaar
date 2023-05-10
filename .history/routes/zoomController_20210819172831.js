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
    const { userId } = request.body;
    console.log(request.body);

    const payload = {
        "topic": "Test Webinar",
        "type": 5,
        "start_time": "2020-09-20T06:59:00Z",
        "duration": "60:00",
        "timezone": "Asia/Calcutta",
        "password": "avfhfgh",
        "agenda": "Test Webinar",
        "recurrence": {
            "type": 1,
            "repeat_interval": 1,
            "end_date_time": "2020-09-22T06:59:00Z"
        },
        "settings": {
            "host_video": "true",
            "panelists_video": "true",
            "practice_session": "true",
            "hd_video": "true",
            "hd_video_for_attendees": "false",
            "send_1080p_video_to_attendees": "false",
            "approval_type": 0,
            "registration_type": 2,
            "audio": "both",
            "auto_recording": "none",
            "enforce_login": "false",
            "close_registration": "true",
            "show_share_button": "true",
            "allow_multiple_devices": "false",
            "email_language": "en-US",
            "panelists_invitation_email_notification": true,
            "registrants_confirmation_email": true,
            "registrants_email_notification": true,
            "attendees_and_panelists_reminder_email_notification": {
                "enable": true,
                "type": 1
            },
            "follow_up_attendees_email_notification": {
                "enable": true,
                "type": 1
            },
            "follow_up_absentees_email_notification": {
                "enable": true,
                "type": 1
            }
        }
    }


zoomApi.post(`https://api.zoom.us/v2/users/${userId}/webinars`, payload)
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
    const { userId, type } = request.body;
    zoomApi.get(`https://api.zoom.us/v2/users/${userId}/meetings`, { type: type })
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