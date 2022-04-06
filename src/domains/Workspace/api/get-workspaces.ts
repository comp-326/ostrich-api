import authorize from "@base/src/middlewares/Auth/authorize"
import { Router } from "express"
import MakeRequestAdapter from "../Adapter"
import { getWorkspaces } from "../controller"
const qRouter = Router()
export async function makeQueryAllWorkspaceApiCall(app: Router) {
	app.use("/", qRouter)
	qRouter.get("/", authorize.adminRequired,MakeRequestAdapter(getWorkspaces))
}
