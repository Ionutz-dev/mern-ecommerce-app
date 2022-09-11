import path from 'path';
import express from 'express';
import multer from 'multer';
import pkg from 'cloudinary';
import asyncHandler from 'express-async-handler';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

const cloudinary = pkg.v2;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce-app-products',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

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
