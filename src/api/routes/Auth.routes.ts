/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express'
import {
	confirmAccountEmail,
	getActivationToken,
	login,
	register,
	resetPassword,
} from '../controllers/Auth.controller'
import {
	acceptWorkspaceInvitation,
	verifyWorkspaceInvitation,
} from '../controllers/Workspace.controller'
import {
	emptyEmailField,
	emptyFirstnameField,
	emptylastNameField,
	emptyPasswordField,
	passwordRegex,
	confirmPasswordMatch,
} from '../middlewares/form/form.validator'
import {
	checkAccountActivation,
	checkAccountMailExist,
	checkRegisteredMail,
} from '../middlewares/model/models.validators'
import { confirmPasswordResetToken } from '../middlewares/requests/request'

const router = Router()

/**
 * Register new user
 */
router
	.route('/register')
	.post(
		emptyEmailField,
		emptyFirstnameField,
		emptylastNameField,
		emptyPasswordField,
		passwordRegex,
		confirmPasswordMatch,
		checkRegisteredMail,
		register,
	)
// Login new User
router
	.route('/login')
	.post(
		emptyEmailField,
		emptyPasswordField,
		checkAccountMailExist,
		checkAccountActivation,
		login,
	)
/**
 * Confirm User account
 */
router.route('/account/confirm/:token').post(confirmAccountEmail)

/**
 * Get activation email if not received or expired
 */
router
	.route('/account/confirm/get/token')
	.post(emptyEmailField, getActivationToken)
/**
 * Reset password and Update password
 */
router
	.route('/account/password/reset/:resetToken')
	.put(
		confirmPasswordResetToken,
		emptyPasswordField,
		passwordRegex,
		confirmPasswordMatch,
		resetPassword,
	)
/**
 * Get pasword reset link
 */
router
	.route('/account/password/forgot')
	.post(emptyEmailField, confirmAccountEmail)
// Accept workspace invitation
router
	.route('/workspace/:workspaceId/join/:token')
	.post(
		verifyWorkspaceInvitation,
		emptyEmailField,
		emptyFirstnameField,
		emptylastNameField,
		emptyPasswordField,
		passwordRegex,
		confirmPasswordMatch,
		checkRegisteredMail,
		acceptWorkspaceInvitation,
	)

export default router
