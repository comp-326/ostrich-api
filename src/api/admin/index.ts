import { VERSION } from './../../config'
import express from 'express'
import { modelValidator as mvl } from '../utils/validators'
import getUsers from './controller/getUsers'

export default ({
	urlPath,
	app,
}: {
	urlPath: string
	app: express.Application
}) => {
	const router = express.Router()
	router.get('/users/all/', mvl.userIsAdmin, getUsers)

	app.use(`/${VERSION}/${urlPath}`, router)

	return app
}
