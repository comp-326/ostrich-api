import { v2 as cloudinary } from 'cloudinary';
import {cloudinaryConfig} from '@ostrich-config';


export default cloudinary.config({
	cloud_name: cloudinaryConfig.CLOUDINARY_NAME,
	api_key: cloudinaryConfig.CLOUDINARY_API_KEY,
	api_secret: cloudinaryConfig.CLOUDINARY_SECRET,
	secure: true,
});
