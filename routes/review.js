const express = require('express')
const router = express.Router()
const Review = require('../src/models/Review')
const Client = require('../src/models/Client')

router.get('/', function(request, response) {
    Review.findAll({
        include: [
            {
                model: Client,
                as: 'Client'
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
            await Review.create({
                clientId: client.id,
                reviewDate: '2020-06-20 12:05:00',
                
            }).then(async review => {
                let createList = []
                for (let [index, val] of listId.entries()) {
                    createList.push({
                        'reviewId': review.id,
                        'listId': val.id,
                        'staffId': 1,
                    })
                }
                await ReviewList.bulkCreate(createList).then(
                    list => {
                        console.log('Review Created')
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
                    await Review.create({
                        clientId: client.id,
                        reviewDate: '2020-06-20 12:05:00'
                    }).then(async review => {
                        let createList = []
                        for (let [index, val] of listId.entries()) {
                            createList.push({
                                'reviewId': review.id,
                                'listId': val.id,
                                'staffId': 1
                            })
                        }
                        await ReviewList.bulkCreate(createList).then(
                            list => {
                                console.log('Review Created')
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


router.post('/add-review', async function(request, response) {
    const rating = request.body.rating;
    const status = request.body.status;
    const description = request.body.description;
    const clientId = request.body.clientId;

    console.log(request.body)
    await Review.create({
        clientId: clientId,
        status: status,
        description: description,
        rating: rating

    }).then( review => {
        response.json(review)
    }).catch( err => {
        response.json(err)
    })

})

router.get('/edit/:id', function(request, response) {
    const reviewId = request.params.id

    Review.findByPk(reviewId)
        .then(review => {
            if (!review) {
                response.status(404).json({
                    message: 'No Review Exist.'
                })
            }

            response.json({
                id: review.id,
                clientId: review.clientId,
                status: review.status,
                rating: review.rating,
                description: review.description
            })
        })
        .catch(err => {
            console.log(err)
        })
})


router.put('/update/:id', async function(request, response) {
    const reviewId = request.params.id;
    const rating = request.body.rating;
    const status = request.body.status;
    const description = request.body.description;
    const clientId = request.body.clientId;


    await Review.update({
            status: status,
            rating: rating,
            clientId: clientId,
            description: description,
        }, {
            where: {
                id: reviewId
            }
        })
        .then(async function(rowsUpdated) {
            response.json(rowsUpdated);
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })

})


router.delete('/delete/:id', async function(request, response) {
    const reviewId = request.params.id
console.log(reviewId)
   await ReviewList.destroy({
        where: {
            reviewId: reviewId
          },
    })
    .then(async function(rowDelted) {
            await Review.destroy({
                where: {
                    id: reviewId
                  },
            })
            .then(function (rowDeleted) {
                response.json({
                    message : 'Review deleted succssfully.'
                })
            })
            .catch((error) => {
                response.json(error)
            })
    })
})

module.exports = router