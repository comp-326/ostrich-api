import dotenv from "dotenv"
import path from "path"

dotenv.config()

const BASE_DIR = path.dirname(__dirname)

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const HOST = process.env.HOST
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT
const REFRESH_KEY = process.env.REFRESH_KEY
const WEB_CLIENT = process.env.WEB_CLIENT_PASSWORD_RESET_URL
const API = process.env.API

export default {
	PORT,
	SECRET_KEY,
	REFRESH_KEY,
	HOST,
	DATABASE_URL,
	API,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	BASE_DIR,
	WEB_CLIENT,
}
export {
	PORT,
	SECRET_KEY,
	REFRESH_KEY,
	HOST,
	DATABASE_URL,
	WEB_CLIENT,
	API,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	BASE_DIR,
}
