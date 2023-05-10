const jwt = require('jsonwebtoken');
var rp = require('request-promise');
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
    get: function (uri, data) {

        var options = {
            //You can use a different uri if you're making an API call to a different Zoom endpoint.
            uri: uri,
            qs: data,
            auth: {
                'bearer': token
            },
            headers: {
                'content-type': 'application/json'
            },
            json: true //Parse the JSON string in the response
        };
        return rp(options)
            .then(function (response) {
                return JSON.stringify(response)
            })
            .catch(function (err) {
                // API call faileud...
                console.log('API call failed, reason ', err);
            });
    },
    put: function (uri,data) {

    },
    post: function (uri, data) {
        
    },
    delete: function (uri) {
        
    }

}


module.exports = zoom