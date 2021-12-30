import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT
const SECRET_KEY = process.env.SECRET_KEY
const HOST = process.env.HOST
const DATABASE_URL = process.env.DATABASE_URL
const REFRESH_KEY = process.env.REFRESH_KEY
const API = process.env.API

export default { PORT, SECRET_KEY, REFRESH_KEY, HOST, DATABASE_URL, API }
export { PORT, SECRET_KEY, REFRESH_KEY, HOST, DATABASE_URL, API }
