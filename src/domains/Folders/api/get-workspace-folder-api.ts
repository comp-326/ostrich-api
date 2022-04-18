import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { findWorkspaceFolders } from "../controllers"

const qRouter = Router()
export async function makeQueryWorkspaceFoldersApiCall(app: Router) {
	app.use("/workspace", qRouter)
	qRouter.post("/:workspaceId", MakeRequestAdapter(findWorkspaceFolders))
}
