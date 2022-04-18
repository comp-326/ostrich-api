import { Router } from "express"
import api from "./api"

const folderRouter = Router()
export default function folderDomain(app: Router) {
	app.use("/folders", folderRouter)
	api.makeQueryNewFolderApiCall(folderRouter)
	api.makeQueryIdFolderApiCall(folderRouter)
	api.makeQueryFolderByNameApiCall(folderRouter)
	api.makeQueryFoldersApiCall(folderRouter)
	api.makeQueryWorkspaceFoldersApiCall(folderRouter)
	api.makeQueryUpdateMoveFolderApiCall(folderRouter)
	api.makeQueryUpdateCopyFolderApiCall(folderRouter)
	api.makeQueryUpdateFolderApiCall(folderRouter)
	api.makeQueryDeleteFolderApiCall(folderRouter)
	return app
}
