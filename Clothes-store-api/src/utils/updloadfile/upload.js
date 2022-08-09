const multer = require("multer");
let fs = require("fs-extra");
// let storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     let path = `./uploads`;
//     fs.mkdirsSync(path);
//     callback(null, path);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });
let storage = multer.diskStorage({});
  
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|png|jpeg|JPG|PNG|JPEG)$/)) {
      return callback(new Error("please upload an image"));
    }
    callback(undefined, true);
  },
});


module.exports = { upload };
