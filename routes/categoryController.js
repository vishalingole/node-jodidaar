const express = require('express')
const categoryController = express.Router()
const authenticateJWT = require('../src/middleware/authenticateJWT')
const Category = require('../src/models/Category')
const upload  = require('../src/upload')

categoryController.get('/', authenticateJWT, async function(request, response) { 
    Category.findAll()
        .then(Categories => {
            response.json(Categories)
        })
        .catch(err => console.log(err))
})

categoryController.post('/create', upload.single('image'), authenticateJWT, async function(request, response) { 
    request.body.categoryImage = request.file.path;

    Category.create(request.body)
    .then( services => {
        console.log('Client Created')
        response.json(services)
    })
    .catch(err => {response.json(err)})
})

categoryController.put('/update/:id', upload.single('image'), authenticateJWT, async function(request, response) {
    const categoryId = request.params.id
    request.body.categoryImage = request.file.path;
    Category.update(request.body, { where: { uuid : categoryId }})
      .then(function(rowsUpdated) {
        response.json(rowsUpdated)
      })
      .catch(err => {response.json(err)})
})

categoryController.get('/:id', authenticateJWT, async function(request, response) { 
    response.send('get category by id')
})


module.exports = categoryController