/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express'
import {
	confirmAccountEmail,
	login,
	register,
} from '../controllers/Auth.controller'
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

const router = Router()

router.post(
	'/register',
	emptyEmailField,
	emptyFirstnameField,
	emptylastNameField,
	emptyPasswordField,
	passwordRegex,
	confirmPasswordMatch,
	checkRegisteredMail,
	register,
)
router.post(
	'/login',
	emptyEmailField,
	emptyPasswordField,
	checkAccountMailExist,
	checkAccountActivation,
	login,
)
router.get('/account/confirm/:token', confirmAccountEmail)
router.get('/account/confirm/:token', confirmAccountEmail)

export default router
