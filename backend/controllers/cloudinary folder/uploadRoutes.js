// uploadRoute.js
import express from 'express';
import multer from 'multer';
import cloudinary from './cloudinary.js';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Files saved temporarily

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'ecommerce-products',
    });

    fs.unlinkSync(filePath); // Remove temp file

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed', details: error.message });
  }
});

export default router;
