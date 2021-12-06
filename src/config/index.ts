import dotenv from "dotenv"
import { NodeConfType } from "src/types"
import path from "path"

dotenv.config()

const BASE_DIR = path.dirname(__dirname)
// console.log(BASE_DIR);


const PORT = process.env.PORT || 4200
const HOST = process.env.HOST || '127.0.0.1'
const VERSION = process.env.VERSION || '/v1'
const DB_URL = process.env.DB_URL
const SECRET_KEY = process.env.SECRET_KEY
const REFRESH_KEY = process.env.REFRESH_KEY
const NODE_ENV = <NodeConfType>process.env.NODE_ENV || 'development'

export default Object.freeze({
    PORT,
    HOST,
    VERSION,
    DB_URL,
    SECRET_KEY,
    REFRESH_KEY,
    NODE_ENV, BASE_DIR
})
export {
    PORT,
    HOST,
    VERSION,
    DB_URL,
    SECRET_KEY,
    REFRESH_KEY,
    NODE_ENV, BASE_DIR
}