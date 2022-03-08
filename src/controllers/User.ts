import { Router } from "express"
import JwtAuth from "./../auth/JwtAuth"
import { UserService } from "./../services"

const router = Router()
const service = new UserService()
const auth = new JwtAuth()

//GET user details
router.get("/profile/:id", auth.userRequired, service.updateProfile)
router.get("/single/:id/profile", service.getUserById)
router.get("/", service.getAllUsers)

// UPDATE USER
router
	.route("/profile/update/:id")
	.put(auth.userRequired, service.updateProfile)

// DELETE user
router.route("/").delete(auth.adminRequired)
export default router
