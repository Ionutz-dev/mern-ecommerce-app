import path from 'path';
import express from 'express';
import multer from 'multer';
import pkg from 'cloudinary';
import asyncHandler from 'express-async-handler';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

const cloudinary = pkg.v2;

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-app-products',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Images only!');
//   }
// }

const upload = multer({ storage });

router.post(
  '/',
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const uploadPhoto = await cloudinary.uploader.upload(`${req.file.path}`, {
      width: 640,
      height: 510,
      crop: 'pad',
      background: 'white',
    });
    res.send(uploadPhoto.url);
  })
);

export default router;
