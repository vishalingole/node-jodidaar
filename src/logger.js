require('./database/connection')
const Logs = require('../src/models/Logs')
var fs = require('fs');


var logger = {}

logger = {
    info: function(data) {	
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
	readHTMLFile: function(path, callback) {
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