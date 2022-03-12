import { Router } from "express"
import { AvailabilityService } from "../services/index.service"
import JwtAuth from "./../auth/JwtAuth"
const router = Router()

const service = new AvailabilityService()
const auth = new JwtAuth()
// Create user availability
router.route("/availability/new").post( auth.adminRequired, service.func)
// Update availability
router.route("/availability/update/:id").put(auth.adminRequired, service.func)
//Delete availability
router.route("/availability/delete/:id").delete(auth.adminRequired, service.func)

export default router
