import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { findTodos } from "../controllers"

const qRouter = Router()
export function makeQueryTodoApiCall(app: Router) {
	app.use("/all", qRouter)
	qRouter.get("/", MakeRequestAdapter(findTodos))
}
