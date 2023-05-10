const jwt = require('jsonwebtoken');
const axios = require('axios');

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: 'qT49GOmuT2eCLWNDMFp4ZQ',
    exp: ((new Date()).getTime() + 5000)
};
console.log(payload)
const token = jwt.sign(payload, 'yWUUkBVePME1V3K9ILEGCVf4eDy6rpSxScx0');
console.log(token)

var zoom = {}

const headers = {
    'Content-Type': 'application/json',
    'Authorization':  'bearer'+ token,
    'User-Agent': 'Zoom-api-Jwt-Request',
   
  }

zoom = {
    get: function (data) {
        console.log(data);
        axios.get('https://api.zoom.us/v2/users/', headers)
            .then(response => {
                // handle success
                console.log(response.data)
                // res.send(response.data)
            })
        // return new Promise((resolve, reject) => {
        //     Logs.create(data)
        // 		.then(
        // 			log => {
        // 				resolve(log)
        // 			})
        // 		.catch(err => {
        //             console.log(err)
        // 			reject(err);
        // 		});

        // });
    }

}


module.exports = zoom