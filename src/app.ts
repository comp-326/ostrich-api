import express from "express"
import expressLoader from "./expressLoader"

const app = express()
expressLoader({ app })

export default app
