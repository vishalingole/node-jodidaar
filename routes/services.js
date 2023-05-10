const express = require('express')
const router = express.Router()
const Services = require('../src/models/Services')
const ServiceList = require('../src/models/ServiceList')
const upload  = require('../src/upload')

//Get All Services
router.get('/', function(request, response) {
    Services.findAll()
        .then(services => {
            response.json(services)
        })
        .catch(err => console.log(err))
})

//Get service List
router.get('/:id', function(request, response) {
    const serviceId = request.params.id

    Services.findByPk(serviceId, {
        include: [
            {
                model : ServiceList,
                as : 'ServiceList',
            }
        ]
    })
        .then(service => {
            if(!service){
                response.status(404).json({ message: 'No Service Exist.' })
            }
            console.log(service)
            response.json(service)
        })
        .catch(err => console.log(err))
})

// Get edit service data
router.get('/edit/:id', function(request, response) {
    const serviceId = request.params.id

    Services.findByPk(serviceId)
        .then(service => {
            if(!service){
                response.status(404).json({ message: 'No Service Exist.' })
            }
            response.json(service)
        })
        .catch(err => console.log(err))
})

// Create Service
router.post('/create', upload.single('image'), function(request, response) {
    request.body.categoryImage = request.file.path;
    console.log(request.body)

    Services.create(request.body)
    .then( services => {
        console.log('Client Created')
    response.json(services)
    })
    .catch(err => {response.json(err)})
})

// Update service
router.put('/update/:id', upload.single('image'), function(request, response) {
    const serviceId = request.params.id

    Services.update(request.body, { where: { id : serviceId }})
      .then(function(rowsUpdated) {
        response.json(rowsUpdated)
      })
})

// Delete Service
router.delete('/delete/:id', function(request, response) {
    const serviceId = request.params.id

    Services.destroy({
        where: {
            id: serviceId
          },
        }
      )
      .then(function(rowDelted) {
        response.json(rowDelted)
      })
})



module.exports = router