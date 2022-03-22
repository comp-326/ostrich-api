import {
	CLOUDINARY_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_SECRET,
} from "../config"

import { v2 as cloudinary } from "cloudinary"

export default cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_SECRET,
	secure: true,
})
