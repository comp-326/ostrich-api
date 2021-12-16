import { Request, Response } from 'express'
import { User } from './../../../models'

const getUsers = async function (req: Request, res: Response) {
	const users = await User.find().limit(10)
	if (!users.length)
		return res.status(404).json({ message: 'No user data available' })
	const filtered = users.map(user => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...props } = user._doc
		return props
	})
	return res.status(200).json({ message: 'Sucess', users: filtered })
}

export default getUsers
