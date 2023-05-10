const express = require('express')
const zoomController = express.Router();
const payload = {
    iss: process.env.APIKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, process.env.APISecret);


zoomController.get('/users', async function(request, response) { 
    response.send('get user by id')
})


module.exports = zoomController