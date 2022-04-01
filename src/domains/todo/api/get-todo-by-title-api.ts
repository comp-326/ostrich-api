import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import {findByTitle} from "../controllers"

const qRouter = Router()
export async function makeQueryTitleTodoApiCall(app: Router) {
	app.use("/title/search", qRouter)
	qRouter.post("/", MakeRequestAdapter(findByTitle))
}
