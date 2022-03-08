import { Router } from "express"
// import JWTauth from "./../auth/JwtAuth"
import {
	UserModelMiddleware,
	UserFormMiddleware,
	AuthService,
} from "./../services"
const router = Router()
const ufm = new UserFormMiddleware()
const umm = new UserModelMiddleware()
const service = new AuthService()
// const auth = new JWTauth()

/**
 * Create account
 */
router.route("/register").post(
	ufm.emailField,
	ufm.firstNameField,
	ufm.lastNameField,
	ufm.passwordField,
	ufm.passwordRegex,
	ufm.passwordFieldMatch,
	umm.isRegistered,
	service.register,
)
/**
 * Get email activation link
 */
router
	.route("/account/activate/email")
	.post(ufm.emptyEmailField, umm.isRegistered, service.getActivationToken)
/**
 * Activate account
 */
router.
	route("/account/activate/:activationToken")
	.post(umm.isRegistered,
		service.validAccountActivationToken,
		service.confirmAccountEmail)
/**
 * Get password reset link
 */
router
	.route("/account/password/forgot")
	.post(ufm.emailField,
		umm.isRegistered,
		service.sendPasswordResetLink)
/**
 * Reset password
 */
router.route("/account/password/new/:resetToken").post(
	ufm.confirmPasswordResetToken,
	ufm.validPasswordResetLink,
	ufm.passwordField,
	ufm.passwordRegex,
	ufm.confirmPasswordMatch,
	ufm.newPasswordMatchConfirmNewPassword,
	ufm.emailPasswordReset
)
/**
 * Login to account
 */

router
	.route("/login")
	.post(ufm.emailField,
		ufm.passwordField,
		umm.isActive,
		service.login)

export default router
