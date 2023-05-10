const express = require('express')
const router = express.Router()
const Client = require('../src/models/Client')
// const twilioApi = require('../src/twilio-api')
const jwt = require('jsonwebtoken');


router.get('/', function(request, response) {
    Client.findAll()
        .then(client => {
            response.json(client)
        })
        .catch(err => console.log(err))
})

router.post('/create', function(request, response) {
    Client.create(request.body)
    .then( client => {
        console.log('Client Created')
        response.json(client)
    })
    .catch(err => {response.json(err)})
})

router.get('/edit/:id', function(request, response) {
    const clientId = request.params.id

    Client.findByPk(clientId)
        .then(client => {
            if(!client){
                response.status(404).json({ message: 'No Client Exist.' })
            }
            response.json(client)
        })
        .catch(err => console.log(err))
})

router.put('/update/:id', function(request, response) {
    const clientId = request.params.id
    const { firstName, lastName, gender, email, mobile, address, city } = request.body

    Client.update(
        { 
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            mobile: mobile,
            address: address,
            city: city,
        },
        { 
            where: { id : clientId } 
        }
      )
      .then(function(rowsUpdated) {
        response.json(rowsUpdated)
      })
})

router.delete('/delete/:id', function(request, response) {
    console.log(request.params)
    const clientId = request.params.id

    Client.destroy({
        where: {
            id: clientId
          },
        }
      )
    .then(function(rowDelted) {
        response.json(rowDelted)
    })
    .catch((error) => {
        console.log(error)
        response.json(error)
    })
})

router.post('/otp', function(request, response) {
    const mobileNumber = request.body.mobile
    // Client.findOne({
    //     raw: true,
    //     where: {
    //         mobile: mobileNumber
    //     }
    // })
    // .then(client => {
    //     if(!client){
    //         response.status(404).send({ 
    //             message: 'No Client Exist.' 
    //         })
    //     } else {
            // twilioApi.data.sendOTP(mobileNumber).then((data) => {
            //     console.log(data)
            //     response.json(data)
            // })
            // .catch((err) => {
            //     console.log(err.message)
            //     response.status(500).send({
            //         message:
            //           err.message || "Some error occurred while retrieving tutorials."
            //       });
            // })
    //     }
    // })
    // .catch(err => {
    //     response.status(500).send({
    //         message:
    //           err.message || "Some error occurred while retrieving tutorials."
    //       });
    // })

})

router.post('/validateotp', function(request, response) {
    const mobileNumber = request.body.mobile
    const otp = request.body.otp
    
    twilioApi.data.verifyOTP(mobileNumber, otp)
    .then((data) => {
        if("approved" == data.status) {

            response.json(data);

            // Client.findOne({
            //     raw: true,
            //     where: {
            //         mobile: mobileNumber
            //     }
            // })
            // .then(client => {
            //     if(!client){
            //         response.status(404).json({
            //             message: 'No Client Exist.' 
            //         })
            //     } else {
            //         console.log(client)
            //         const token = jwt.sign(
            //             {
            //                 email : client.email,
            //                 firstName: client.firstName,
            //                 lastName: client.lastName,
            //                 mobile: client.mobile
            //             },
            //             process.env.JWT_KEY,
            //             {
            //                 expiresIn: '1h'
            //             },
            //         )
        
            //         return response.status(200).json({
            //             message: "Auth Successful",
            //             token: token
            //         })
            //     }
                
            // })
        }
    })
    .catch((err) => {
        response.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
    })
})

router.post('/send-message', function(request, response) {
    const mobileNumber = request.body.mobile
    const message = request.body.message
    
    twilioApi.data.sendSMS(mobileNumber, message).then((data) => {
        response.json(data)
    })
    .catch((err) => {
        response.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tutorials."
            });
    })
})

router.get('/client-count', function(request, response) {
    Client.count()
    .then(data => {
        response.json({count : data})
    })
    .catch(err => {
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });
})



module.exports = router