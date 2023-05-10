const jwt = require('jsonwebtoken');
// const rp = require('request-promise');
//Use the ApiKey and APISecret from config.js
const payload = {
    iss: 'qT49GOmuT2eCLWNDMFp4ZQ',
    exp: ((new Date()).getTime() + 5000)
};
console.log(payload)
const token = jwt.sign(payload, 'yWUUkBVePME1V3K9ILEGCVf4eDy6rpSxScx0');
console.log(token)

const DEBUG = true;

var zoom = {}

zoom = {
    get: function (data) {
     
        var options = {
            //You can use a different uri if you're making an API call to a different Zoom endpoint.
            uri: "https://api.zoom.us/v2/users/",
            qs: {
                status: 'active'
            },
            auth: {
                'bearer': token
            },
            headers: {
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            },
            json: true //Parse the JSON string in the response
        };
    
        console.log(options)
        //Use request-promise module's .then() method to make request calls.
        rp(options)
            .then(function (response) {
                //printing the response on the console
                console.log('User has', response);
                //console.log(typeof response);
                res.send(response);
    
            })
            .catch(function (err) {
                // API call failed...
                console.log('API call failed, reason ', err);
            });
    }

}


module.exports = zoom