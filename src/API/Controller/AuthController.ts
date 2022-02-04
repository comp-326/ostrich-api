import {
	emptyNewPassword,
	emptyConfirmNewPassword,
} from "./../Middlewares/form/user.validators"
import {
	emailPasswordReset,
	newPasswordRegex,
	sendPasswordResetLink,
	updateAccountPassword,
	validPasswordResetLink,
} from "./../Services/PassWord.service"
import { Authorize } from "./../Middlewares/AuthJwt"
import {
	activeUser,
	emptyCurrentPassword,
	matchCurrentPassword,
	newPasswordMatchConfirmNewPassword,
} from "./../Middlewares/model/models.validators"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from "express"
import {
	emptyEmailField,
	emptyFirstnameField,
	emptylastNameField,
	emptyPasswordField,
	passwordRegex,
	confirmPasswordMatch,
} from "../Middlewares/form/user.validators"
import {
	checkRegisteredMail,
	checkAccountMailExist,
	newPasswordMatchOldPassword,
} from "../Middlewares/model/models.validators"
import { confirmPasswordResetToken, validAccountActivationToken } from "../Middlewares/requests/request"
import {
	login,
	getActivationToken,
	register,
	confirmAccountEmail,
} from "../Services/Auth.service"

const router = Router()

const registerMiddlewares = [
	emptyEmailField,
	emptyFirstnameField,
	emptylastNameField,
	emptyPasswordField,
	passwordRegex,
	confirmPasswordMatch,
	checkRegisteredMail,
]
const loginMiddlewares = [
	emptyEmailField,
	emptyPasswordField,
	checkAccountMailExist,
	activeUser,
]
const passResetLinkMiddlewares = [emptyEmailField, checkAccountMailExist]
const updatePassMiddlewares = [
	Authorize,
	emptyCurrentPassword,
	emptyNewPassword,
	matchCurrentPassword,
	newPasswordMatchOldPassword,
	passwordRegex,
	newPasswordMatchConfirmNewPassword,
]
const resetPasswordMiddlewares = [
	confirmPasswordResetToken,
	validPasswordResetLink,
	emptyNewPassword,
	newPasswordRegex,
	emptyConfirmNewPassword,
	newPasswordMatchConfirmNewPassword,
]
/**
 * Register new user
 *
 */
router.post("/register", ...registerMiddlewares, register)
/**
 * Login new User
 */

router.post("/login", ...loginMiddlewares, login)

/**
 * Confirm User account
 */
router.post("/account/confirm/:token",validAccountActivationToken, confirmAccountEmail)

/**
 * Get activation email if not received or expired
 */
router
	.route("/account/activate/email")
	.post(emptyEmailField, getActivationToken)

/**
 * ************** HANDLING PASSWORDS ********************
 */
/**
 * Update account password
 */
router.put(
	"/profile/password/update",
	...updatePassMiddlewares,
	updateAccountPassword,
)
/**
 * Get pasword reset link
 */
router.post(
	"/account/password/forgot",
	...passResetLinkMiddlewares,
	sendPasswordResetLink,
)
/**
 * Reset password and Update password
 */
router.put(
	"/account/password/reset/:resetToken",
	...resetPasswordMiddlewares,
	emailPasswordReset,
)
export default router
