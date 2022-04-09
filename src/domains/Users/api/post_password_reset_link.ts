import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { postRequestPasswordReset } from "../controllers"

const qRouter = Router()
export async function makeQueryGetPasswordResetApiCall(app: Router) {
	app.use("/account/password/forgot", qRouter)
	qRouter.post("/", MakeRequestAdapter(postRequestPasswordReset))
}
