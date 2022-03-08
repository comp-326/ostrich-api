import { Router } from "express"
import JwtAuth from "./../auth/JwtAuth"
import { UserService, UserModelMiddleware, UserFormMiddleware } from "./../services"

const router = Router()
const service = new UserService()
const umm = new UserModelMiddleware()
const ufm = new UserFormMiddleware()

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
	.route("/user/password/update")
	.put(auth.userRequired,
		ufm.currentPasswordField,
		umm.isMatchCurrentPassword,
		ufm.passwordField,
		ufm.passwordRegex,
		ufm.passwordFieldMatch,
		service.updatePassword)
// DELETE user
router.route("/").delete(auth.adminRequired)
export default router

