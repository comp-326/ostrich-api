import { Router } from "express"
import {
	FolderService,
} from "../services/index.service"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new FolderService()
const auth = new JwtAuth()
// Get folders
router.route("/").post(auth.adminRequired, service.createFolder)
router.route("/standouts").post(auth.adminRequired)
// Create user folder
router
	.route("/workspace/:workspaceId/folder/new")
	.post(auth.adminRequired, service.createFolder)
// Get folder
router.route("/workspace/folder/single/:folderId").post(auth.adminRequired)
// Update folder
router.route("/folder/update/:folderId").put(auth.adminRequired, service.updateFolder)
//Delete folder
router
	.route("/folder/delete/:folderId")
	.delete(auth.adminRequired, service.deleteFolder)

export default router
