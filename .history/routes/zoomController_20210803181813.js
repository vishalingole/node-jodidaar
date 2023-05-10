const express = require('express')
const zoomController = express.Router()


zoomController.get('/users', async function(request, response) { 
    response.send('get user by id')
})


module.exports = zoomController