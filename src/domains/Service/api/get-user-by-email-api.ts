import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import {findByTitle} from "../controllers"

const qRouter = Router()
export async function makeQueryEmailUserApiCall(app: Router) {
	app.use("/email", qRouter)
	qRouter.post("/", MakeRequestAdapter(findByTitle))
}
