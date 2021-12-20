const express = require('express')
const helmet = require('helmet')
const path = require('path')
const morgan = require('morgan')
const yamljs = require('yamljs')
const SwaggerUI = require('swagger-ui-express')
const cors = require('cors')
const config = require('../config')
const authRouter = require('../routes/Auth.routes')
const userRouter = require('../routes/User.routes')
const adminRouter = require('../routes/Admin.routes')
const { connectToDatabase } = require('../db')

// Config variables
// eslint-disable-next-line no-unused-vars
const { API_VERSION, DATABASE_URL, BASE_DIR } = config

// App constants
const app = express()
connectToDatabase(DATABASE_URL) // Connection to db
// Middlewares

app.use(morgan('combined'))
app.use(helmet())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

//
const DOCS = path.join(BASE_DIR, '/apiDocs/api.yaml')
// Routes
app.get(`/${API_VERSION}`, (req, res) => {
	res.json('Success')
})
app.use(`/${API_VERSION}/users`, userRouter)
app.use(`/${API_VERSION}/auth`, authRouter)
app.use(`/${API_VERSION}/admin`, adminRouter)
app.use(
	`/${API_VERSION}/docs`,
	SwaggerUI.serve,
	SwaggerUI.setup(yamljs.load(DOCS), { customSiteTitle: 'Ostrich Api' }),
)

module.exports = app
