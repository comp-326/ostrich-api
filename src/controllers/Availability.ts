import { Router } from "express"
import { AvailabilityService } from "./../services"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new AvailabilityService()
const auth = new JwtAuth()
router.post("/create", auth.superAdminRequired, service.func)
// router.delete("/permissions/reset",service.resetRoles)

export default router
