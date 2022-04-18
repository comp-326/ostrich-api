import { Router } from "express"
import MakeRequestAdapter from "../adapters"
import { findFolders } from "../controllers"

const qRouter = Router()
export function makeQueryFoldersApiCall(app: Router) {
	app.use("/", qRouter)
	qRouter.get("/", MakeRequestAdapter(findFolders))
}
