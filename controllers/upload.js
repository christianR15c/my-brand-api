/* 
const formidable = require('formidable');
const detect = require('detect-file-type');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// uploading image
const upload = () => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    // detecting file extension
    detect.fromFile(files.image.filepath, (err, result) => {
      // setting allowed extensions
      console.log(files.image);
      const pictureName = `${files.image.originalFilename}${Date.now()}.${
        result.ext
      }`;
      const allowedImageType = ['jpg', 'jpeg', 'png'];
      if (!allowedImageType.includes(result.ext)) {
        return res.send('please choose file with image extension');
      }
      const oldPath = files.image.filepath;
      const newPath = path.join(__dirname, '..', 'images', pictureName);
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return res.send('cannot move the file');
        }
        const imgURL = `http://localhost:8080/file/${files.image.originalFilename}`;
        res.send(imgURL);
      });
    });
  });
};
module.exports = multer({ storage: upload });
*/

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  )
    cb(null, true);
  else {
    cb(null, false);
  }
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
