import { Router } from "express"
import api from "./api"

const forlderRouter = Router()
export default function userDomain(app: Router) {
	app.use("/users", forlderRouter)
	api.makeUpdateUserApiCall(forlderRouter)
	api.makeQueryIdUserApiCall(forlderRouter)
	api.makeQueryEmailUserApiCall(forlderRouter)
	api.makeQueryUserApiCall(forlderRouter)
	api.makeDeleteUserApiCall(forlderRouter)
	return app
}
