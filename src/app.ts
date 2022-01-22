import express from "express"
import expressLoader from "./ExpressLoader"

const app = express()
expressLoader({ app })

export default app
