/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import router from './../router'
import ErrorHandler from './../middlewares/ErrorHandler'
import db from './../db'
import { DATABASE_URL } from './../config'

export default ({ app }: { app: Application }) => {
	app.use(express.json({ limit: '100mb' }))
	app.use(express.urlencoded({ extended: true }))
	app.use(morgan('combined'))
	app.use(cors({ origin: '*' }))
	app.use(helmet())
	//Database connection
	db({ databaseUrl: DATABASE_URL! })
	//App routes config and setup
	router({ app })
	// Error handling setup middleware
	app.use(ErrorHandler)
	return app
}
