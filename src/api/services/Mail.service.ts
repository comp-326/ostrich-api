/* eslint-disable @typescript-eslint/no-explicit-any */
import nodeMailer from 'nodemailer'
import { EMAIL_ACCOUNT, EMAIL_PASSWORD } from './../../config'

export const mailTransport = nodeMailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: EMAIL_ACCOUNT,
		pass: EMAIL_PASSWORD,
	},
})

export const resetPasswordTemplate = token => {
	return `
	<p>Please click the link below to activate your</p>
	<p>The link will expire in the next 1hour</p>
	<a href='http://localhost:3000/auth/password/reset/${token}'>Reset password</a>
	`
}
