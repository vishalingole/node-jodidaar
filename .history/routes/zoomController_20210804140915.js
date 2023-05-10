const express = require('express')
const zoomController = express.Router();
const jwt = require('jsonwebtoken');
const zoomApi = require('../src/zoom-api')

zoomController.get('/users', async function(request, response) { 

    zoomApi.get({id : '123'}).then(data => {
        response.send(data)
    })
    .catch(error => {
        response.send(error)
    })

    // console.log(token);
})


module.exports = zoomController