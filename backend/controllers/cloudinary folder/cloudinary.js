// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: "dhoenyn4d",
  api_key: "728157352976489",
  api_secret: "BKdmQskRfQpAwRk0I-7JDY2ZMKE",
});

export default cloudinary;
