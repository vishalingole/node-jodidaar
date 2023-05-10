const express = require('express')
const zoomController = express.Router();
const jwt = require('jsonwebtoken');
const APIKey = process.env.API_KEY;
const APISecret = process.env.API_SECRET;
console.log('+++'+APIKey)
console.log(APISecret)

// const payload = {
//     iss: APIKey,
//     exp: ((new Date()).getTime() + 5000)
// };
// console.log(payload);
// const token = jwt.sign(payload, process.env.APISecret);


zoomController.get('/users', async function(request, response) { 
    // console.log(token);
    response.send('get user by id')
})


module.exports = zoomController