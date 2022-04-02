import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { putUser } from "../controllers"
const qRouter = Router()
export async function makeUpdateUserApiCall(app: Router) {
	app.use("/update", qRouter)
	qRouter.put("/:id", MakeRequestAdapter(putUser))
}
