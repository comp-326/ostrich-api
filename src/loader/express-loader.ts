import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

export default ({ app }: { app: Application }) => {
	// Db
	require('./../db/index')
	// Middlewares
	app.use(morgan('combined'))
	app.use(express.json({ limit: '100mb' }))
	app.use(express.urlencoded({ extended: true }))
	app.use(helmet())

	return app
}
