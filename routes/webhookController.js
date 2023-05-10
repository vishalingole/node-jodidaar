const express = require('express')
const webhookController = express.Router();
const jwt = require('jsonwebtoken');
const zoomApi = require('../src/zoom-api');
const twilioApi = require('../src/twilio-api')
const mobileNumber = process.env.ADMIN_NUMBER;
const transporter = require('../src/mailer')


webhookController.post('/', async function(request, response) {

        switch (request.body.event) {
            case 'webinar.participant_left':
                console.log(request.body.payload)
                console.log(request.body.event)
                break;
            case 'webinar.participant_joined':
                console.log(request.body.payload)
                console.log(request.body.event)
                const message = `Registration created for ${request.body.payload.object.participant.email}`;

                var mailOptions = {
                    from: 'apideveloper1991@gmail.com',
                    to: 'vishal.ingole3@gmail.com',
                    subject: `Registration Created`,
                    text: message
                  };
                    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                break;
            case 'webinar.registration_created':
                console.log(request.body.payload)
                console.log(request.body.event)
                // const message = `Registration created for ${request.body.payload.registrant.email}`;
                // twilioApi.data.sendSMS(mobileNumber, message).then((data) => {
                //     response.json(data)
                // })
                // .catch((err) => {
                //     response.status(500).send({
                //         message:
                //             err.message || "Some error occurred while retrieving tutorials."
                //         });
                // })


                var mailOptions = {
                    from: 'apideveloper1991@gmail.com',
                    to: 'vishal.ingole3@gmail.com',
                    subject: `Registration Created`,
                    text: message
                  };
                    
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });


                break;

            default:
                break;
        }


})

module.exports = webhookController

