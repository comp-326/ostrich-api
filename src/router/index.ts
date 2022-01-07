import { Application } from 'express'
import AuthRouter from '../api/routes/Auth.routes'
import WorkspaceRouter from '../api/routes/Workspace.routes'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import { BASE_DIR } from './../config'

const DOCS = YAML.load(path.join(BASE_DIR, '/docs/api.yml'))

export default ({ app }: { app: Application }) => {
	app.use('/auth', AuthRouter)
	app.use('/workspace', WorkspaceRouter)
	app.use(
		'/',
		swaggerUi.serve,
		swaggerUi.setup(DOCS, { customSiteTitle: 'Ostrich App' }),
	)
	return app
}
