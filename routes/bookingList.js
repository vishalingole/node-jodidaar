const express = require('express')
const router = express.Router()
const Booking = require('../src/models/Booking')
const BookingList = require('../src/models/BookingList')


router.get('/', function(request, response) {
    BookingList.findAll({ include: [{
        model : Booking,
        as : 'Booking'
    }
    ]})
        .then(data => {
            response.json(data)
        })
        .catch(err => {
            response.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });
})

router.post('/create', function(request, response) {
    Booking.create(request.body)
    .then( client => {
        console.log('Client Created')
        response.json(client)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
})


module.exports = router