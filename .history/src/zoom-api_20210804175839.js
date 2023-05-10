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
                return err;

                // API call faileud...
                console.log('API call failed, reason ', err);
            });
    },
    put: function (uri, data) {

    },
    post: function (uri, data) {

        var options = {
            method: 'POST',
            uri: url,
            body: data,
            json: true // Automatically stringifies the body to JSON
        };
        
        return rp(options)
            .then(function (response) {
                return JSON.stringify(response)
            })
            .catch(function (err) {
               return JSON.stringify(err.statusCode);
            });

    },
    delete: function (uri) {

    }

}


module.exports = zoom