const express = require('express')
const router = express.Router()
const Staff = require('../src/models/Staff')
const upload  = require('../src/upload')
const path = require('path')
const sharp = require('sharp');
const fs = require('fs');

router.get('/', function(request, response) {
    Staff.findAll()
        .then(staff => {
            response.json(staff)
        })
        .catch(err => console.log(err))
})

router.post('/create',upload.single('image'), async function(request, response) {

    request.body.image = request.file.path;

    console.log(request.body)

    // await sharp(request.file.path)
    // .resize(200)
    // .toBuffer()
    // .then( data => {
    //     fs.writeFileSync(request.file.path, data);
    // })
    // .catch( err => {
    //     console.log(err);
    // });			


    // const resize = size => sharp(request.file.path)
    // .resize(size, size)
    // .toFile(request.file.path+`-${size}.jpg`);

    // Promise
    // .all([1440, 1080, 720, 480].map(resize))
    // .then(() => {
    //     console.log('complete');
    // });

    Staff.create(request.body)
    .then( staff => {
        console.log('Staff Created')
        response.json(staff)
    })
    .catch(err => {console.log(err)})
})

router.get('/edit/:id', function(request, response) {
    const staffId = request.params.id

    Staff.findByPk(staffId)
        .then(staff => {
            if(!staff){
                response.status(404).json({ message: 'No Staff Exist.' })
            }
            response.json(staff)
        })
        .catch(err => console.log(err))
})

router.put('/update/:id', function(request, response) {
    console.log()
    const staffId = request.params.id
    const { firstName, lastName, gender, email, mobile, address, city, description } = request.body

    Staff.update(
        { 
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            mobile: mobile,
            address: address,
            city: city,
            description: description
        },
        { 
            where: { id : staffId } 
        }
      )
      .then(function(rowsUpdated) {
        response.json(rowsUpdated)
      })
})

router.delete('/delete/:id', function(request, response) {
    const staffId = request.params.id

    Staff.destroy({
        where: {
            id: staffId
          },
        }
      )
      .then(function(rowDelted) {
        response.json(rowDelted)
      })
})



module.exports = router