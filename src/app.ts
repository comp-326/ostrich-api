import express from 'express'
import loader from './expressLoader'

const app = express()

loader({ app })

export default app
