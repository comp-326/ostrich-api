/* eslint-disable no-unsafe-finally */
import express from 'express'
import mailer from '../../utils/mail/mailer'
import { User } from './../../../models'
import passwordHandler from '../../utils/password/password'

const register = async (req: express.Request, res: express.Response) => {
	try {
		const hashedPassword = await passwordHandler.generatePasswordHash(
			req.body.password,
		)
		const newUser = new User({
			...req.body,
			password: hashedPassword,
			accountType: 'basic',
			role: 'user',
		})
		const savedUser = await newUser.save()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...props } = savedUser._doc

		mailer({
			email: props.email,
			firstName: props.firstName,
			lastName: props.lastName,
			userId: props._id,
			role: props.role,
			accountType: props.accountType,
		})
		return res.json({
			message:
				'Successfully created account please check your email to confirm your account',
			user: props,
		})
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}

export default register
