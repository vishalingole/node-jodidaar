const multer  = require('multer')
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req.url)
        const { userId } = req.body
        if(userId){
            const dir = `public/uploads/${userId}`
            fs.exists(dir, exist => {
            if (!exist) {
              return fs.mkdir(dir, error => cb(error, dir))
            }
            return cb(null, dir)
            })
        } else {
            cb(null, 'public/uploads/');
        }
       

    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: storage })