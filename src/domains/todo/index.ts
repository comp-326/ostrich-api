import { Router } from "express"
import api from "./api"

const todoRouter = Router()
export default function todoDomain(app: Router) {
	app.use("/todos", todoRouter)
	api.makeNewTodoApiCall(todoRouter)
	api.makeUpdateTodoApiCall(todoRouter)
	api.makeQueryIdTodoApiCall(todoRouter)
	api.makeQueryTitleTodoApiCall(todoRouter)
	api.makeQueryTodoApiCall(todoRouter)
	api.makeDeleteTodoApiCall(todoRouter)
	return app
}
