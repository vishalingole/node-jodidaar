const express = require('express')
const router = express.Router()
const ServiceList = require('../src/models/ServiceList')
const Services = require('../src/models/Services')
const upload  = require('../src/upload')

router.get('/', function(request, response) {
    ServiceList.findAll({ include: [{
        model : Services,
        as : 'Services'
    }
    ],
    // where : { id : 49}
    })
    .then(services => {
        response.json(services)
    })
    .catch(err => console.log(err))
})

router.post('/create', upload.single('image'), function(request, response) {
  
    request.body.image = request.file.path;
    console.log(request.body);
    ServiceList.create(request.body)
    .then( data => {
        console.log('Service list Created')
        response.json(data)
    })
    .catch(err => {
        response.json(err)
    })
})


router.get('/image/:name', function(request, response) {
    const imageName = request.params.name
    response.sendFile(imageName, { root: '/var/www/node-tutorial/public/uploads' }, function (err) {
        if(err) {
            response.json(err)
        }
    })
})


// Get edit service data
router.get('/edit/:id', function(request, response) {
    const listId = request.params.id

    ServiceList.findByPk(listId)
        .then(list => {
            if(!list){
                response.status(404).json({ message: 'No Service Exist.' })
            }
            response.json(list)
        })
        .catch(err => console.log(err))
})

// Delete Service List
router.delete('/delete/:id', function(request, response) {
    const listId = request.params.id

    ServiceList.destroy({
        where: {
            id: listId
          },
        }
      )
      .then(function(rowDelted) {
        response.json(rowDelted)
      })
})

module.exports = router