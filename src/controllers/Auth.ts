import { Router } from "express"
// import JWTauth from "./../auth/JwtAuth"
import { UserMiddleware as UM, AuthService, UserService } from "../services/index.service"
const router = Router()
const service = new AuthService()
const userS = new UserService()
// const auth = new JWTauth()

/**
 * Create account
 */
router
	.route("/register")
	.post(
		UM.validateAccountDoesNotExist,
		UM.validateAccountDoesNotExist,
		service.register,
	)
/**
 * Get email activation link
 */
router
	.route("/account/activate/email")
	.post(
		UM.validateAccountExist,
		UM.validateAccountIsActive,
		service.getActivationToken,
	)
/**
 * Activate account
 */
router
	.route("/account/activate/:activationToken")
	.post(
		service.validAccountActivationToken,
		service.confirmAccountEmail,
	)
/**
 * Get password reset link
 */
router
	.route("/account/password/forgot")
	.post(
		UM.validateAccountExist,
		UM.validateAccountIsActive,
		service.sendPasswordResetLink,
	)
/**
 * Reset password
 */
router
	.route("/account/password/new/:resetToken")
	.post(
		UM.validateAccountExist,
		UM.validateAccountIsActive,
		userS.updatePassword,
	)
/**
 * Login to account
 */

router
	.route("/login")
	.post(UM.validateLoginDetails, UM.validateAccountIsActive, service.login)

export default router
