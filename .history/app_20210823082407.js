require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const router = express.Router()
const logger = require('./src/logger');
// const cronjob = require('./src/cronjob')


const twilioApi  = require('./src/twilio-api');
const transporter = require('./src/mailer')

// twilioApi.data.sendSMS('+917796042050', 'Server is up');

const app = express()

//Showing images from public uploads
app.use(express.static('public'));


app.get('/', (req, res) => res.send('INDEX'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

app.use(function(error, request, response, next) {
    let requestBody = request.body
    let requestMethod = request.method
    let requestPath = request.path
    if("POST" == requestMethod) {
   
        // if(requestMethod == 'GET'){
        //     requestBody = null;
        // }
        // let oldSend = response.send;
        // response.send = function(data) {

        //     logger.info({'response': data, 'request': JSON.stringify(requestBody), 'requestName' : requestPath, 'responseCode': response.statusCode })
        //     .catch(err => {
        //         console.log(err)
        //     })

        //     oldSend.apply(response, arguments)
        // }
    }
    if(200 != response.statusCode){
        var mailOptions = {
            from: 'apideveloper1991@gmail.com',
            to: 'vishal.ingole3@gmail.com',
            subject: 'Something went Wrong!',
            text: 'Error occured with status code : '+ response.statusCode
          };
            
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    next()
})


//DB Connection
require('./src/database/connection')
require('./src/bootstrap')();

app.use('/api/category', require('./routes/categoryController'))
app.use('/api/user', require('./routes/userController'))
app.use('/api/product', require('./routes/productController'))
app.use('/api/zoom', require('./routes/zoomController'))
app.use('/api/zoom/webhook/webinar', require('./routes/webhookController'))



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on port ${PORT}`))