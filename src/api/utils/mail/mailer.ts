/* eslint-disable @typescript-eslint/no-non-null-assertion */
import nodemailer from 'nodemailer'
// import hbs from 'nodemailer-express-handlebars'
import html from 'nodemailer-html-to-text'
import {
	PORT,
	VERSION,
	HOST,
	MAIL_ACCOUNT,
	MAIL_PASSWORD,
} from '../../../config'
import generateToken from '../jwt'
import { MailerUserOptions } from './MailerUserOptions'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: MAIL_ACCOUNT!,
		pass: MAIL_PASSWORD!,
	},
})

transporter.use('compile', html.htmlToText())

const mailerService = async (user: MailerUserOptions) => {
	const token = await generateToken({ ...user })
	const URL = `http://${HOST!}:${PORT!}/${VERSION!}/auth/account/confirm/${token}`
	const message = `<h1>Email Confirmation</h1>
    <h2>Hello ${user.firstName} ${user.lastName}</h2>
    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
    <p>The link expires in the next 1hour</p>
    <a href=${URL}> Click here to confirm your account</a>
    </div>`
	transporter
		.sendMail({
			date: new Date().toISOString(),
			html: message,
			to: user.email,
			from: MAIL_ACCOUNT,
			subject: 'Account confirmation',
		})
		.then(() => {
			console.log('Email sent')
		})
		.catch(err => {
			console.log(err.message)
		})
}

export default mailerService
