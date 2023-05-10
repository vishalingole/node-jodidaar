const express = require('express')
const productController = express.Router()
const authenticateJWT = require('../src/middleware/authenticateJWT')
const Product = require('../src/models/Product')
const ProductImage = require('../src/models/ProductImage')
const upload  = require('../src/upload')
const userService = require('../src/services/userService');

productController.get('/', authenticateJWT, async function(request, response) { 
    Product.findAll({attributes: ['uuid', 'subcategoryId']})
        .then(products => {
            response.json(products)
        })
        .catch(err => console.log(err))
})

productController.post('/create', upload.array('image', 5), authenticateJWT, async function(request, response) { 
    const files = request.files;
    const { userId, subcategoryId } = request.body;

    const userInfo =  await userService.getUserId(userId).then(user => {
        Product.create({ 'userId' : user.id, 'subcategoryId' : subcategoryId })
        .then( product => {
             files.forEach(file => {
                ProductImage.create({ 'productId' : product.id, 'originalname': file.originalname, 'mimeType' : file.mimetype, 'fileSize' :file.size,'path': file.path, 'filename' : file.filename  })
                .catch(err => {response.json(err)})
            });
            
            response.json({
                'statusCode': 200,
                'message': 'Product created successfully.'
            })
        })
        .catch(err => {response.json(err)})
    }).catch(err => {
        response.json({ 
            'statusCode': 404,
            'message':'User not found.'
        })
    })
})

productController.put('/update/:id', upload.single('image'), authenticateJWT, async function(request, response) {
    const productId = request.params.id
    request.body.productImage = request.file.path;
    Product.update(request.body, { where: { uuid : productId }})
      .then(function(rowsUpdated) {
        response.json(rowsUpdated)
      })
      .catch(err => {response.json(err)})
})

productController.get('/:id', authenticateJWT, async function(request, response) { 
    const uuid = request.params.id

    Product.findOne({ where: { 'uuid' : uuid },attributes: ['uuid', 'subcategoryId']})
        .then(products => {
            response.json(products)
        })
        .catch(err => console.log(err))
})


module.exports = productController