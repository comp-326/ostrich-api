import { Router } from "express"
import {  ServiceService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new ServiceService()
const auth = new JwtAuth()
router.post("/create", auth.superAdminRequired, service.func)
// router.delete("/permissions/reset",service.resetRoles)

export default router
