import { Router } from "express"
import { AppointmentService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new AppointmentService()
const auth = new JwtAuth()
router.post("/create", auth.superAdminRequired, service.func)
// router.delete("/permissions/reset",service.resetRoles)

export default router
