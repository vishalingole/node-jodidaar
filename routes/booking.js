const express = require('express')
const router = express.Router()
const Booking = require('../src/models/Booking')
const BookingList = require('../src/models/BookingList')
const Client = require('../src/models/Client')
const Staff = require('../src/models/Staff')
const transporter = require('../src/mailer')
const ServiceList = require('../src/models/ServiceList')
const logger = require('../src/logger')
const handlebars = require("handlebars");


router.get('/', function(request, response) {
    Booking.findAll({
            include: [{
                    model: BookingList,
                    as: 'BookingList',
                    include: [{
                        model: Staff,
                        as: 'Staff'
                    }]
                },
                {
                    model: Client,
                    as: 'ClientInfo'
                }
            ]
        })
        .then(data => {
            console.log(data)
            response.json(data)
        })
        .catch(err => {
            response.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
})

router.post('/create', async function(request, response) {
    var user = request.body.user
    const clientId = request.body.clientId
    var bookingDate = request.body.bookingDate;
    var listId = request.body.booking;
    var bookingAt = request.body.user.bookingAt;
    const bookingTime = request.body.user.bookingTime;


    //    console.log(request.body.user); 
    // var isExist = isMobileExist(user.mobile).then(isUnique => {
    //     if (isUnique) {
    //         // ...
    //     }
    // })

    // console.log(user);return false;
    
    var promise = Client.findOne({ where:{
        'mobile': user.mobile,
        'email': user.email
    }}).then(async client => {
        //if user found.
        if (client) {
            await Booking.create({
                clientId: client.id,
                bookingDate: bookingDate,
                bookingTime: '21:09',
                bookingAt: bookingAt
                
            }).then(async booking => {
                let createList = []
                for (let [index, val] of listId.entries()) {
                    createList.push({
                        'bookingId': booking.id,
                        'listId': val.id,
                        'staffId': 1,
                    })
                }
                await BookingList.bulkCreate(createList).then(
                    list => {

                        console.log('Booking Created')
                        var mailOptions = {
                            from: 'apideveloper1991@gmail.com',
                            to: 'vishal.ingole3@gmail.com',
                            subject: 'Sending Email using Node.js',
                            html: 'New booking is created!'
                          };
                            
                        transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                        });
                        response.json(list)
                    }
                ).catch(err => {
                    response.status(500).send({
                        message: err.message || "Some error occurred while retrieving tutorials."
                    });
                })
            })
        } else {

            const userInfo = {
                firstName: user.firstName,
                lastName: user.lastName,
                email:  user.email,
                mobile: user.mobile,
                gender: user.gender,
                address: user.address,
                city: user.city,
            };

            await Client.create(userInfo)
                .then(async clientInfo => {
                    console.log('Client Created with Id'+ clientInfo.id)
                    await Booking.create({
                        clientId: clientInfo.id,
                        bookingDate: '2020-06-20 12:05:00',
                        bookingTime: bookingTime,
                        bookingAt: bookingAt
                    }).then(async booking => {
                        let createList = []
                        for (let [index, val] of listId.entries()) {
                            createList.push({
                                'bookingId': booking.id,
                                'listId': val.id,
                                'staffId': 1
                            })
                        }
                        await BookingList.bulkCreate(createList).then(
                            list => {
                                console.log('Booking Created')
                                var mailOptions = {
                                    from: 'apideveloper1991@gmail.com',
                                    to: 'vishal.ingole3@gmail.com',
                                    subject: 'Sending Email using Node.js',
                                    html: 'New booking is created!'
                                  };
                                    
                                transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                                });
                                response.json(list)
                            }
                        ).catch(err => {
                            response.status(500).send({
                                message: err.message || "Some error occurred while retrieving tutorials."
                            });
                        })
                    })
                })
                .catch(err => {
                    console.log(err)
                    response.json(err.message)
                })
        }
    })

})


router.post('/add-booking', async function(request, response) {
    const clientId = request.body.clientId;
    const listId = request.body.listId;
    const status = request.body.status;
    var bookingAt = request.body.bookingAt;

    await Booking.create({
        clientId: clientId,
        bookingDate: request.body.bookingDate,
        status: status,
        bookingTime: request.body.bookingTime+'00',
        bookingAt: bookingAt

    }).then(async booking => {
        let createList = []
        for (let [index, val] of listId.entries()) {
            createList.push({
                'bookingId': booking.id,
                'listId': val,
                'staffId': 1
            })
        }
        await BookingList.bulkCreate(createList).then(
            list => {
                // var mailOptions = {
                //     from: 'apideveloper1991@gmail.com',
                //     to: 'vishal.ingole3@gmail.com',
                //     subject: 'Sending Email using Node.js',
                //     html: 'New booking is created!'
                //   };
                    
                // transporter.sendMail(mailOptions, function(error, info){
                // if (error) {
                //     console.log(error);
                // } else {
                //     console.log('Email sent: ' + info.response);
                // }
                // });

                logger.readHTMLFile('/var/www/node-tutorial/public/pages/emailWithPDF.html', function(err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                        name: "Vishal Ingole", 
                        body: "Your booking confirmed with Salon!",
                        bookingDate : request.body.bookingDate,
                    };
                    var htmlToSend = template(replacements);
                    var mailOptions = {
                        from: 'apideveloper1991@gmail.com',
                        to : 'vishal.ingole3@gmail.com',
                        subject : 'Booking Confirmed with Salon',
                        html : htmlToSend
                     };
                     transporter.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                            callback(error);
                        }
                    });
                });

                response.json(list)
            }
        ).catch(err => {
            response.status(500).send({
                message: err.message || "Some error occurred while adding booking."
            });
        })

    })
})

router.get('/edit/:id', function(request, response) {
    const bookingId = request.params.id

    Booking.findByPk(bookingId, {
            include: [{
                model: BookingList,
                as: 'BookingList',
                raw: true,
            }]
        })
        .then(booking => {
            if (!booking) {
                response.status(404).json({
                    message: 'No Booking Exist.'
                })
            }
            var listArray = booking.BookingList.map(function(obj) {
                // console.log(obj.dataValues)
                return obj.dataValues.listId;
            });

            response.json({
                id: booking.id,
                clientId: booking.clientId,
                listId: listArray,
                bookingDate: booking.bookingDate,
                status: booking.status,
                bookingTime: booking.bookingTime,
                bookingAt: booking.bookingAt,

            })
        })
        .catch(err => {
            console.log(err)
        })
})


router.put('/update/:id', async function(request, response) {
    const bookingId = request.params.id;
    const listId = request.body.listId;
    const clientId = request.body.clientId;
    const status = request.body.status;
    const bookingTime = request.body.bookingTime;
    var bookingAt = request.body.bookingAt;


    await Booking.update({
            clientId: clientId,
            bookingDate: request.body.bookingDate,
            status: status,
            bookingTime: bookingTime+'00',
            bookingAt: bookingAt
            
        }, {
            where: {
                id: bookingId
            }
        })
        .then(async function(rowsUpdated) {

            await BookingList.destroy({
                    where: {
                        bookingId: bookingId
                    },
                })
                .then(async function(rowDelted) {
                    let createList = []
                    for (let [index, val] of listId.entries()) {
                        createList.push({
                            'bookingId': bookingId,
                            'listId': val,
                            'staffId': 1
                        })
                    }

                    await BookingList.bulkCreate(createList).then(
                        list => {
                            response.json(list)
                        }
                    ).catch(err => {
                        response.status(500).send({
                            message: err.message || "Some error occurred while adding booking."
                        });
                    })
                })
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })

})


router.delete('/delete/:id', async function(request, response) {
    const bookingId = request.params.id
console.log(bookingId)
   await BookingList.destroy({
        where: {
            bookingId: bookingId
          },
    })
    .then(async function(rowDelted) {
            await Booking.destroy({
                where: {
                    id: bookingId
                  },
            })
            .then(function (rowDeleted) {
                response.json({
                    message : 'Booking deleted succssfully.'
                })
            })
            .catch((error) => {
                response.json(error)
            })
    })
})

router.get('/booking-count', function(request, response) {
    Booking.count()
    .then(data => {
        response.json({count : data})
    })
    .catch(err => {
        response.status(500).send({
            message: err.message || "Some error occurred while retrieving tutorials."
        });
    });
})


router.post('/view-booking', function (request, response) {
    const bookingId = request.body.bookingId;
    const mobile = request.body.mobile;
    console.log(mobile)
    Client.findOne({ where: {
        'mobile': mobile,
    }}).then(async client => {
        console.log(client)
        //if user found.
        if (client) {
            console.log(client.id)
            Booking.findByPk(bookingId, {
                    include: [{
                        model: BookingList,
                        as: 'BookingList',
                        include: [{
                            model: ServiceList,
                            as: 'ServiceList'
                        }],
                        raw: true,
                    }]
                })
                .then(data => {

                    if(data == null || data.clientId != client.id) {
                        response.json({ message : 'Booking not present.'})
                    } else {
                        response.json(data) 
                    }
                })
                .catch(err => {
                    response.status(500).send({
                        message: err.message || "Some error occurred while retrieving tutorials."
                    });
                });
        } else {
            response.json({ message : 'Booking not present.'})
        }
    })
})

module.exports = router