const express = require('express')
const router = express.Router()
const Offer = require('../src/models/Offer')
const OfferList = require('../src/models/OfferList')

router.get('/', function(request, response) {
    Offer.findAll()
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
    var offerDate = request.body.offerDate;
    var listId = request.body.offer;

    //    console.log(request.body.user); 
    // var isExist = isMobileExist(user.mobile).then(isUnique => {
    //     if (isUnique) {
    //         // ...
    //     }
    // })

    // console.log(user);return false;

    var promise = Client.findOne({
        'mobile': request.body.user.mobile,
        'email': request.body.user.email
    }).then(async client => {

        //if user found.
        if (client) {
            await Offer.create({
                clientId: client.id,
                offerDate: '2020-06-20 12:05:00',
                
            }).then(async offer => {
                let createList = []
                for (let [index, val] of listId.entries()) {
                    createList.push({
                        'offerId': offer.id,
                        'listId': val.id,
                        'staffId': 1,
                    })
                }
                await OfferList.bulkCreate(createList).then(
                    list => {
                        console.log('Offer Created')
                        response.json(list)
                    }
                ).catch(err => {
                    response.status(500).send({
                        message: err.message || "Some error occurred while retrieving tutorials."
                    });
                })
            })

        } else {

            await Client.create(request.body.user)
                .then(async client => {
                    await Offer.create({
                        clientId: client.id,
                        offerDate: '2020-06-20 12:05:00'
                    }).then(async offer => {
                        let createList = []
                        for (let [index, val] of listId.entries()) {
                            createList.push({
                                'offerId': offer.id,
                                'listId': val.id,
                                'staffId': 1
                            })
                        }
                        await OfferList.bulkCreate(createList).then(
                            list => {
                                console.log('Offer Created')
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


router.post('/add-offer', async function(request, response) {
    const listId = request.body.listId;
    const status = request.body.status;
    const name = request.body.name;
    const price = request.body.price;

    console.log(request.body)
    await Offer.create({
        name: name,
        status: status,
        price: price

    }).then(async offer => {
        let createList = []
        for (let [index, val] of listId.entries()) {
            createList.push({
                'offerId': offer.id,
                'listId': val,
            })
        }
        await OfferList.bulkCreate(createList).then(
            list => {
                response.json(list)
            }
        ).catch(err => {
            response.status(500).send({
                message: err.message || "Some error occurred while adding offer."
            });
        })

    })
})

router.get('/edit/:id', function(request, response) {
    const offerId = request.params.id

    Offer.findByPk(offerId, {
            include: [{
                model: OfferList,
                as: 'OfferList',
                raw: true,
            }]
        })
        .then(offer => {
            if (!offer) {
                response.status(404).json({
                    message: 'No Offer Exist.'
                })
            }
            var listArray = offer.OfferList.map(function(obj) {
                // console.log(obj.dataValues)
                return obj.dataValues.listId;
            });

            response.json({
                id: offer.id,
                listId: listArray,
                status: offer.status,
                name: offer.name,
                price: offer.price
            })
        })
        .catch(err => {
            console.log(err)
        })
})


router.put('/update/:id', async function(request, response) {
    const offerId = request.params.id;
    const listId = request.body.listId;
    const status = request.body.status;
    const name = request.body.name;
    const price = request.body.price;


    await Offer.update({
            status: status,
            name: name,
            price: price
        }, {
            where: {
                id: offerId
            }
        })
        .then(async function(rowsUpdated) {

            await OfferList.destroy({
                    where: {
                        offerId: offerId
                    },
                })
                .then(async function(rowDelted) {
                    let createList = []
                    for (let [index, val] of listId.entries()) {
                        createList.push({
                            'offerId': offerId,
                            'listId': val,
                        })
                    }

                    await OfferList.bulkCreate(createList).then(
                        list => {
                            response.json(list)
                        }
                    ).catch(err => {
                        response.status(500).send({
                            message: err.message || "Some error occurred while adding offer."
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
    const offerId = request.params.id
console.log(offerId)
   await OfferList.destroy({
        where: {
            offerId: offerId
          },
    })
    .then(async function(rowDelted) {
            await Offer.destroy({
                where: {
                    id: offerId
                  },
            })
            .then(function (rowDeleted) {
                response.json({
                    message : 'Offer deleted succssfully.'
                })
            })
            .catch((error) => {
                response.json(error)
            })
    })
})

module.exports = router