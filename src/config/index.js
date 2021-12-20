/* eslint-disable no-undef */
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const BASE_DIR = path.dirname(__dirname)
const PORT = process.env.PORT
const API_VERSION = process.env.API_VERSION
const HOST = process.env.HOST
const BASE_URL = process.env.BASE_URL
const DATABASE_URL = process.env.DATABASE_URL
const NODE_ENV = process.env.NODE_ENV
const SECRET_KEY = process.env.NODE_ENV
const REFRESH_KEY = process.env.REFRESH_KEY
const MAIL_ACCOUNT = process.env.MAIL_ACCOUNT
const MAIL_PASSWORD = process.env.MAIL_PASSWORD

module.exports = {
	HOST,
	BASE_URL,
	API_VERSION,
	PORT,
	DATABASE_URL,
	NODE_ENV,
	SECRET_KEY,
	REFRESH_KEY,
	MAIL_ACCOUNT,
	MAIL_PASSWORD,
	BASE_DIR,
}
