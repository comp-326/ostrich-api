import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import {postFolder} from "../controllers"
const qRouter = Router()
export async function makeQueryNewFolderApiCall(app: Router) {
	app.use("/register", qRouter)
	qRouter.post("/", MakeRequestAdapter(postFolder))
}
