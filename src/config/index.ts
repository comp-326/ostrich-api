/* eslint-disable no-undef */
import dotenv from "dotenv"
// const { dirname } =require ("path")
import path from "path"
// const { fileURLToPath } =require ("url")

dotenv.config()
// const __filename = fileURLToPath(meta.url)
// const __dirname = dirname(__filename)

const BASE_DIR = path.resolve(path.dirname(__dirname))

const PORT = process.env.PORT!
const SECRET_KEY = process.env.SECRET_KEY!
const NODE_ENV = process.env.NODE_ENV!
const DATABASE_URL = process.env.DATABASE_URL!
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET!
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT!
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD!
const WEB_CLIENT = process.env.WEB_CLIENT!
const MOBILE_CLIENT = process.env.MOBILE_CLIENT!
export {
	PORT,
	SECRET_KEY,
	DATABASE_URL,
	CLOUDINARY_NAME,
	CLOUDINARY_SECRET,
	CLOUDINARY_API_KEY,
	NODE_ENV,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	WEB_CLIENT,
	MOBILE_CLIENT,
	BASE_DIR,
}

export default Object.freeze({
	PORT,
	SECRET_KEY,
	DATABASE_URL,
	CLOUDINARY_NAME,
	CLOUDINARY_SECRET,
	CLOUDINARY_API_KEY,
	NODE_ENV,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	WEB_CLIENT,
	MOBILE_CLIENT,
	BASE_DIR,
})
