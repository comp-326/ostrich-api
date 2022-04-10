import authorize from "@base/src/middlewares/Auth/authorize"
import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { putCopyFolder } from "../controllers"
const qRouter = Router()
export async function makeQueryUpdateCopyFolderApiCall(app: Router) {
	app.use("/copy", qRouter)
	qRouter.put(
		"/:workspaceId/:folderId",
		authorize.loginRequired,
		MakeRequestAdapter(putCopyFolder),
	)
}
