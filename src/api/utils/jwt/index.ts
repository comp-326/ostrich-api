/* eslint-disable @typescript-eslint/ban-types */
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../config'

const generateToken = async (user: Object) => {
	const authThToken = await jwt.sign(user, SECRET_KEY, { expiresIn: '1h' })
	return authThToken
}

export default generateToken
