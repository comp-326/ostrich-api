/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const PORT = process.env.PORT
const HOST = process.env.HOST
const DATABASE_URL = process.env.DATABASE_URL
const VERSION = process.env.VERSION!
const SECRET_KEY = process.env.SECRET_KEY!
const REFRESH_KEY = process.env.REFRESH_KEY!
const MAIL_PASSWORD = process.env.MAIL_PASSWORD!
const MAIL_ACCOUNT = process.env.MAIL_ACCOUNT!
const BASE_DIR = path.dirname(__dirname)

export {
	PORT,
	HOST,
	BASE_DIR,
	DATABASE_URL,
	VERSION,
	SECRET_KEY,
	REFRESH_KEY,
	MAIL_ACCOUNT,
	MAIL_PASSWORD,
}

export default Object.freeze({
	PORT,
	HOST,
	BASE_DIR,
	DATABASE_URL,
	VERSION,
	SECRET_KEY,
	REFRESH_KEY,
	MAIL_ACCOUNT,
	MAIL_PASSWORD,
})
