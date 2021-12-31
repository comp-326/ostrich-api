import { Application } from 'express'
import AuthRouter from '../api/routes/Auth.routes'
import WorkspaceRouter from '../api/routes/Workspace.routes'

export default ({ app }: { app: Application }) => {
	app.use('/auth', AuthRouter)
	app.use('/workspace', WorkspaceRouter)
	return app
}
