import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import {postUser} from "../controllers"
const qRouter = Router()
export async function makeQueryNewAvailabilityApiCall(app: Router) {
	app.use("/register", qRouter)
	qRouter.post("/", MakeRequestAdapter(postUser))
}
