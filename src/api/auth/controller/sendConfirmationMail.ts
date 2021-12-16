/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import mailer from '../../utils/mail/mailer'
import { User } from './../../../models'

const sendConfirmationMail = async (req: Request, res: Response) => {
	const { email }: { [prop: string]: string | undefined } = req.body
	const user = await User.findOne({ email })
	// console.log(user)
	if (!user)
		return res.status(404).json({ message: 'User account not found' })
	const { passwod, ...props } = user._doc
	mailer({
		email: props.email,
		firstName: props.firstName,
		lastName: props.lastName,
		userId: props._id,
		role: props.role,
		accountType: props.accountType,
	})
	return res.json({
		message: 'Account activation mail has been sent to your email',
		user: props,
	})
}
export default sendConfirmationMail
