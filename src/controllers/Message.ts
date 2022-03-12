import { Router } from "express"
import {  MessageService } from "../services/index.service"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new MessageService()
const auth = new JwtAuth()
// Create user message
router.route("/workspace/:workspaceId/message/new").post(auth.adminRequired, service.func)
// Get message
router.route("/workspace/:workspaceId/message/single/:id").post(auth.adminRequired, service.func)
// Update message
router.route("/message/update/:id").put(auth.adminRequired, service.func)
//Delete message
router.route("/message/delete/:id").delete(auth.adminRequired, service.func)


export default router
