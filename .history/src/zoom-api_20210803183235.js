const jwt = require('jsonwebtoken');

//Use the ApiKey and APISecret from config.js
const payload = {
    iss: 'qT49GOmuT2eCLWNDMFp4ZQ',
    exp: ((new Date()).getTime() + 5000)
};
console.log(payload)
const token = jwt.sign(payload, 'yWUUkBVePME1V3K9ILEGCVf4eDy6rpSxScx0');
console.log(token)

var zoom = {}

zoom = {
    get: function(data) {	
        return new Promise((resolve, reject) => {
            Logs.create(data)
				.then(
					log => {
						resolve(log)
					})
				.catch(err => {
                    console.log(err)
					reject(err);
				});

		});
	},
	post: function(path, callback) {
		fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
			if (err) {
				throw err;
				callback(err);
			}
			else {
				callback(null, html);
			}
		});
	}
}


module.exports = logger