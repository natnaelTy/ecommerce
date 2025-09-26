// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Function to upload profile picture
export const uploadProfilePicture = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'profile-pictures',
  });
  return result.secure_url;
};
// Function to upload product image
export const uploadProductImage = async (filePath) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'product-images',
  });
  return result.secure_url;
};
