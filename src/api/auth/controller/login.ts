/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import pass from '../../utils/password/password'
import generateToken from '../../utils/jwt'
import { User } from './../../../models'

const login = async (req: Request, res: Response) => {
	const { email }: { [prop: string]: string | undefined } = req.body
	try {
		const user = await User.findOne({ email })
		const userPass = user?.password
		// console.log(user)
		if (!user)
			return res.status(404).json({
				message: 'User account does not exist please register',
			})
		if (
			!pass.comparePasswordHash(
				req.body.password!,
				typeof userPass === 'string' ? userPass : '',
			)
		)
			return res.status(409).json({ message: 'Check your login details' })
		// eslint-disable-next-line no-unsafe-optional-chaining
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...props } = user?._doc
		const authToken = await generateToken({
			// eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
			userId: user!?._id,
			email: user!.email,
			role: user!.role,
		})
		return res.status(200).json({ user: props, authToken })
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}
export default login
