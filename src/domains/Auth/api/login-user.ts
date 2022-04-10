import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import {loginUser} from "../controllers"

const qRouter = Router()
export async function makeQueryLoginApiCall(app: Router) {
	app.use("/login", qRouter)
	qRouter.post("/", MakeRequestAdapter(loginUser))
}
