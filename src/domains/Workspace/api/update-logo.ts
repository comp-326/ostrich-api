import { Router } from "express"
import MakeRequestAdapter from "../Adapter"
import { putWorkspaceLogo } from "../controller"
const qRouter = Router()
export async function makeQueryUpdateLogoWorkspaceApiCall(app: Router) {
	app.use("/workspace/logo", qRouter)
	qRouter.put("/:id", MakeRequestAdapter(putWorkspaceLogo))
}
