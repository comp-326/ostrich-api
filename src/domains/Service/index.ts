import { Router } from "express"
import api from "./api"

const serviceRouter = Router()
export default function userDomain(app: Router) {
	app.use("/users", serviceRouter)
	api.makeUpdateUserApiCall(serviceRouter)
	api.makeQueryIdUserApiCall(serviceRouter)
	api.makeQueryEmailUserApiCall(serviceRouter)
	api.makeQueryUserApiCall(serviceRouter)
	api.makeDeleteUserApiCall(serviceRouter)
	return app
}
