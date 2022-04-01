import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { deleteTodo } from "../controllers"

const qRouter = Router()
export async function makeDeleteTodoApiCall(app: Router) {
	app.use("/delete", qRouter)
	qRouter.delete("/:id", MakeRequestAdapter(deleteTodo))
}
