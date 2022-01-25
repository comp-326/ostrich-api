import { homepage } from "../html"
import { Application } from "express"
import AuthController from "../API/Controller/AuthController"
import UserController from "../API/Controller/UserController"
import WorkspaceController from "../API/Controller/WorkspaceController"
import swaggerUi from "swagger-ui-express"
import DOCS from "../docs/api.json"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { BASE_DIR } from './../config'
// console.log(BASE_DIR)

export default ({ app }: { app: Application }) => {
	app.use("/auth", AuthController)
	app.use("/workspace", WorkspaceController)
	app.use("/user", UserController)
	app.use(
		"/docs",
		swaggerUi.serve,
		swaggerUi.setup(DOCS, { customSiteTitle: "Ostrich App" }),
	)
	app.get("/", (req, res) => {
		res.send(homepage)
	})
	return app
}
