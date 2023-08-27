const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.url);
    console.log(req.body);
    const { userId } = req.body;
    console.log("userid upload to puublic directory", userId);
    if (userId) {
      const dir = `public/uploads/${userId}`;
      fs.ensureDir(dir, (exist) => {
        if (!exist) {
          return fs.mkdir(dir, (error) => cb(error, dir));
        }
        return cb(null, dir);
      });
    } else {
      console.log("upload to puublic directory");
      cb(null, "public/uploads/");
    }
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const { userId } = req.body;
//     let dir;
//     if (userId) {
//       dir = `public/uploads/${userId}`;
//       fs.ensureDir(dir, (err) => {
//         if (err) {
//           cb(err, null);
//         } else {
//           cb(null, dir);
//         }
//       });
//     } else {
//       dir = "public/uploads/";
//       cb(null, dir);
//     }
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

module.exports = multer({ storage: storage });
