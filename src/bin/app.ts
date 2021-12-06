import express from "express"
import expressLoader from "../loader/express-loader"

const app = express()

expressLoader({ app })

export default app
