import authorize from "@base/src/middlewares/Auth/authorize"
import { Router } from "express"
import MakeRequestAdapter from "../Adapter"
import { getUserWorkspaces } from "../controller"
const qRouter = Router()
export async function makeQueryUserWorkspaceApiCall(app: Router) {
	app.use("/member", qRouter)
	qRouter.get("/:userId", authorize.loginRequired,MakeRequestAdapter(getUserWorkspaces))
}
