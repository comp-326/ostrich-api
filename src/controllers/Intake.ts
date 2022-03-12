import { Router } from "express"
import {  IntakeService } from "../services/index.service"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new IntakeService()
const auth = new JwtAuth()
router.post("/create", auth.superAdminRequired, service.func)
// Create user intake
router.route("/workspace/:workspaceId/intake/new").post(auth.adminRequired, service.func)
// Get intake
router.route("/workspace/:workspaceId/intake/single/:id").post(auth.adminRequired, service.func)
// Update intake
router.route("/workspace/:workspaceId/intake/update/:id").put(auth.adminRequired, service.func)
//Delete intake
router.route("/workspace/:workspaceId/intake/delete/:id").delete(auth.adminRequired, service.func)


export default router
