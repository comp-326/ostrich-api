import express from 'express'
import register from './controller/register'
import { VERSION } from './../../config'
import {
	formValidator as fvl,
	modelValidator as mvl,
} from '../utils/validators'
import login from './controller/login'
import sendConfirmationMail from './controller/sendConfirmationMail'
import confirmAccount from './controller/confirmAccountToken'

export default ({
	urlPath,
	app,
}: {
	urlPath: string
	app: express.Application
}) => {
	const router = express.Router()
	router.post(
		'/register',
		fvl.emptyEmailField,
		mvl.userEmailExist,
		fvl.emptyFirstNameField,
		fvl.emptyLastNameField,
		fvl.emptyPasswordField,
		fvl.passwordRegexMatch,
		fvl.passwordEqualConfirmPasswordField,
		register,
	)
	router.post(
		'/login',
		fvl.emptyEmailField,
		fvl.emptyPasswordField,
		mvl.userIsConfirmed,
		login,
	)
	router.post(
		'/account/get/confirmation/link',
		fvl.emptyEmailField,
		sendConfirmationMail,
	)
	router.get('/account/confirm/:token', confirmAccount)

	app.use(`/${VERSION}/${urlPath}`, router)

	return app
}
