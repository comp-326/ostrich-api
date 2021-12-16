import jwt from 'jsonwebtoken'
import { User } from './../../../models'
import { SECRET_KEY } from './../../../config'

const roleValidator = async (token: string, role: string) => {
	const response = jwt.verify(token, SECRET_KEY, async (error, user) => {
		if (error) {
			return { error: true, roleMatch: false }
		}

		const dbUser = await User.findOne(user?.userId)
		if (!(dbUser?.role === role)) return { error: false, roleMatch: true }
		return { error: false, roleMatch: true }
	})
	return response
}

export default roleValidator