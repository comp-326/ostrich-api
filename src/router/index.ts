import { homepage } from './../html'
import { Application } from 'express'
import AuthRouter from '../api/routes/Auth.routes'
import WorkspaceRouter from '../api/routes/Workspace.routes'
import swaggerUi from 'swagger-ui-express'
import DOCS from './../docs/api.json'

export default ({ app }: { app: Application }) => {
	app.use('/auth', AuthRouter)
	app.use('/workspace', WorkspaceRouter)
	app.use(
		'/docs',
		swaggerUi.serve,
		swaggerUi.setup(DOCS, { customSiteTitle: 'Ostrich App' }),
	)
	app.get('/', (req, res) => {
		res.send(homepage)
	})
	return app
}
