import { Router } from "express"
import {  IntakeService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new IntakeService()
const auth = new JwtAuth()
router.post("/create", auth.superAdminRequired, service.func)
// router.delete("/permissions/reset",service.resetRoles)

export default router
