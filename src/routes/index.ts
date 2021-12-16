import swaggerUI, { SwaggerOptions } from 'swagger-ui-express'
import express from 'express'
import YAML from 'yamljs'
import auth from './../api/auth'
import admin from './../api/admin'
import { VERSION, BASE_DIR } from './../config'
import path from 'path'

const swaggerOptions: SwaggerOptions = {
	explorer: true,
	customTitle: 'Ostrich ventures',
}

export default ({ app }: { app: express.Application }) => {
	const docs_url = path.join(BASE_DIR, '/docs/api.yaml')
	app.use(
		`/${VERSION}/docs`,
		swaggerUI.serve,
		swaggerUI.setup(YAML.load(docs_url), swaggerOptions),
	) // Setup documentation
	auth({ urlPath: 'auth', app }) // Authentication app
	admin({ urlPath: 'admin', app }) // Admin app

	return app
}
