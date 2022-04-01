import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { putTodo } from "../controllers"
const qRouter = Router()
export async function makeUpdateTodoApiCall(app: Router) {
	app.use("/update", qRouter)
	qRouter.put("/:id", MakeRequestAdapter(putTodo))
}
