import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

export default ({ app }: { app: express.Application }) => {
	app.use(express.json({ limit: '100mb' }))
	app.use(express.urlencoded({ extended: true }))
	app.use(morgan('combined'))
	app.use(cors({ origin: '*' }))
	app.use(helmet())
	app.disable('x-powered-by')
	return app
}
