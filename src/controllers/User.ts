import { Router } from "express"
import JwtAuth from "./../auth/JwtAuth"
import { UserService, UserMiddleware as UM } from "../services/index.service"

const router = Router()
const service = new UserService()

const auth = new JwtAuth()

//GET user details
router.get("/profile/:id", auth.userRequired, service.updateProfile)
router.get("/single/:id/profile", auth.userRequired, service.getUserById)
router.get("/", service.getAllUsers)

// UPDATE USER
router
	.route("/profile/update/:id")
	.put(auth.userRequired, service.updateProfile)
//Update user password
router
	.route("/profile/password/update")
	.put( UM.validatePasswordDetails, service.updatePassword)
// DELETE user
router.route("/").delete(auth.adminRequired)
export default router
