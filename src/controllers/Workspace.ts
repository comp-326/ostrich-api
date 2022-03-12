import { Router } from "express"
import { WorkspaceService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new WorkspaceService()
const auth = new JwtAuth()
// Create user workspace
router.route("/new").post(auth.userRequired, service.createWorkspace)
// Get workspace
router.route("/workspace/single/:id").post(auth.userRequired, service.getWorkspaceById)
// Update workspace
router.route("/workspace/update/:id").put(auth.userRequired, service.updateWorkspace)
//Delete workspace
router.route("/workspace/delete/:id").delete(auth.userRequired,service.deleteWorkspace)
router.route("/analytics").get(service.getWorkspaceAnalytics)

export default router
