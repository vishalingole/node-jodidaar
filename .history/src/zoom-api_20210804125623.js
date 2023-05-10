const jwt = require('jsonwebtoken');
const rp = require('request-promise');
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

const headers = {
    'User-Agent': 'Zoom-api-Jwt-Request',
    'content-type': 'application/json'
  }

//   axios.interceptors.request.use((config) => {
//       console.log(config)
//     /** In dev, intercepts request and logs it into console for dev */
//     if (DEBUG) { console.info("✉️ ", config); }
//     return config;
// }, (error) => {
//     if (DEBUG) { console.error("✉️ ", error); }
//     return Promise.reject(error);
// });

zoom = {
    get: function (data) {
     
    }

}


module.exports = zoom