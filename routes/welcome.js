const express = require('express')
const router = express.Router()
const Welcome = require('../src/models/Welcome')

router.get('/', function(request, response) {
    Welcome.findAll()
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

    console.log(request.body)
    const heading = request.body.heading
    const description = request.body.description
    const youtubeUrl = request.body.youtubeUrl;

    await Welcome.create({
        heading: heading,
        description: description,
        youtubeUrl: youtubeUrl

    }).then(welcome => {
        response.json(welcome)
    })
    .catch(err => {
        response.status(500).send({
            message: err.message || "Some error occurred while creating welcome information."
        });
    });

})

router.get('/edit/:id', function(request, response) {
    const welcomeId = request.params.id

    Offer.findByPk(welcomeId, {
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
    const welcomeId = request.params.id;
    const heading = request.body.heading
    const description = request.body.description
    const youtubeUrl = request.body.youtubeUrl;


    await Welcome.update({
            heading: heading,
            description: description,
            youtubeUrl: youtubeUrl
        }, {
            where: {
                id: welcomeId
            }
        })
        .then( function(rowsUpdated) {
            response.json(rowsUpdated)
        })
        .catch((error) => {
            console.log(error)
            response.json(error)
        })

})

module.exports = router