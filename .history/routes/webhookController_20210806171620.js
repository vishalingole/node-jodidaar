const express = require('express')
const webhookController = express.Router();
const jwt = require('jsonwebtoken');
const zoomApi = require('../src/zoom-api')

webhookController.post('/', async function(request, response) {

        switch (request.body.event) {
            case 'webinar.participant_left':
                // console.log(request.body.payload)
                // console.log(request.body.event)
                break;
            case 'webinar.participant_joined':
                // console.log(request.body.payload)
                // console.log(request.body.event)
                break;
            case 'webinar.registration_created':
                console.log(request.body.payload)
                console.log(request.body.event)
                break;    
            default:
                break;
        }


})

module.exports = webhookController

