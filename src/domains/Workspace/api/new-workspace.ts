import { Router } from "express"
import MakeRequestAdapter from "../Adapter"
import { postWorkspace } from "../controller"
import  authorize  from '@middlewares/Auth/authorize';
const qRouter = Router()
export async function makeQueryNewWorkspaceApiCall(app: Router) {
	app.use("/new", qRouter)
	qRouter.post("/", authorize.loginRequired,MakeRequestAdapter(postWorkspace))
}
