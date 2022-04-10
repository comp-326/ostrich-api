import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { postRequestActivation } from "../controllers"

const qRouter = Router()
export async function makeQueryGetPasswordResetApiCall(app: Router) {
	app.use("/account/activate/link", qRouter)
	qRouter.post("/", MakeRequestAdapter(postRequestActivation))
}
