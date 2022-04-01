import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import {postTodo} from "../controllers"
const qRouter = Router()
export async function makeNewTodoApiCall(app: Router) {
	app.use("/new", qRouter)
	qRouter.post("/", MakeRequestAdapter(postTodo))
}
