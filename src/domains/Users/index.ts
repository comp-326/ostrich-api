import { Router } from "express"
import api from "./api"

const todoRouter = Router()
export default function userDomain(app: Router) {
	app.use("/users", todoRouter)
	api.makeUpdateUserApiCall(todoRouter)
	api.makeQueryIdUserApiCall(todoRouter)
	api.makeQueryEmailUserApiCall(todoRouter)
	api.makeQueryUserApiCall(todoRouter)
	api.makeDeleteUserApiCall(todoRouter)
	return app
}
