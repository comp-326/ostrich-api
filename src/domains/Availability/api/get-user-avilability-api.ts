import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { findUsers } from "../controllers"

const qRouter = Router()
export function makeQueryUserVailabilityApiCall(app: Router) {
	app.use("/", qRouter)
	qRouter.get("/", MakeRequestAdapter(findUsers))
}
