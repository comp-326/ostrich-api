import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const BASE_DIR = path.dirname(__dirname)

const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const HOST = process.env.HOST
const DATABASE_URL = process.env.DATABASE_URL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const EMAIL_ACCOUNT = process.env.EMAIL_ACCOUNT
const REFRESH_KEY = process.env.REFRESH_KEY
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
	BASE_DIR
}
export {
	PORT,
	SECRET_KEY,
	REFRESH_KEY,
	HOST,
	DATABASE_URL,
	API,
	EMAIL_ACCOUNT,
	EMAIL_PASSWORD,
	BASE_DIR
}
