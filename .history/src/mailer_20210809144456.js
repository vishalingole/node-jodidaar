var nodemailer = require('nodemailer');
const user = process.env.MAILER_USER;
const pass = process.env.MAILER_PASS;

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'apideveloper1991@gmail.com',
//     pass: '9665988376'
//   }
// });

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    // port: 2525,
    auth: {
      user: user, //generated by Mailtrap
      pass: 9766664302 //generated by Mailtrap
    },
    debug: true, // show debug output
    logger: true //
  });

transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Mail Server is ready to take our messages');
    }
});

var readHTMLFile = function(path, callback) {
  fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
      if (err) {
          throw err;
          callback(err);
      }
      else {
          callback(null, html);
      }
  });
};

module.exports = transporter

