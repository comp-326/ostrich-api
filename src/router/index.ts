import { Application } from 'express'
import AuthRouter from './../api/routes/Auth.router'
import InstitutionRouter from './../api/routes/Institution.router'

export default ({ app }: { app: Application }) => {
	app.use('/auth', AuthRouter)
	app.use('/institution', InstitutionRouter)
	return app
}
