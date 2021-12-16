import express from 'express'

import settings from './../settings'
import router from './../routes'

export default ({ app }: { app: express.Application }) => {
	require('./../db') //Database connection
	settings({ app }) // Configure settings
	router({ app }) // Api Routes

	return app
}
