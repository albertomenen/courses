const cloudinary = require('cloudinary').v2;
const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

router.post('/upload', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) return res.status(500).send('Error uploading image');
    res.json({ imageUrl: result.url });
  });
});

module.exports = router;
