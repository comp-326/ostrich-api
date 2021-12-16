/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express'
import { SECRET_KEY } from './../../../config'
import jwt from 'jsonwebtoken'
import { User } from './../../../models'

const confirmAccount = async (req: Request, res: Response) => {
	const { token } = req.params
	if (!token)
		return res.status(401).json({ message: 'No confirmation token' })
	else {
		return jwt.verify(token, SECRET_KEY, async (_err, user) => {
			if (user) {
				const dbUser = await User.findById(user.userId)
				// eslint-disable-next-line @typescript-eslint/no-extra-non-null-assertion
				if (dbUser!?.active)
					return res
						.status(302)
						.json({ message: 'Account already confirmed' })
				await dbUser!.update({ active: true })
				return res.status(200).json({
					message: 'Account activation successful proceed to login',
				})
			}

			return res
				.status(401)
				.json({ message: 'Confirmation link has expired or invalid' })
		})
	}
}
export default confirmAccount
