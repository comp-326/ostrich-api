import jwt from 'jsonwebtoken'
import { AuthRoles } from './authValidator'
import { NextFunction, Request, Response } from 'express'
import { User } from '../../../models'
import { SECRET_KEY } from '../../../config'

class UserValidator {
	userEmailExist = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { email }: { email: string | undefined } = req.body
		try {
			const user = await User.findOne({ email })
			// console.log(user)

			if (user)
				return res
					.status(409)
					.json({ message: 'User email already in use' })
			return next()
		} catch (e) {
			return res.status(500).json({ message: e.message })
		}
	}
	// User is confirmed
	userIsConfirmed = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { email }: { email: string | undefined } = req.body
		const user = await User.findOne({ email })
		// console.log(user)

		if (!user?.active)
			return res
				.status(401)
				.json({ message: 'Pending account. Please verify your email' })
		return next()
	}
	// User is Admin
	userIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
		const AuthTokenHeader = req.headers.authorization
		console.log(AuthTokenHeader)
		if (!AuthTokenHeader)
			return res.status(401).json({ message: 'No auth token provided' })
		try {
			const token = AuthTokenHeader?.split(' ')[1]
			return jwt.verify(token, SECRET_KEY, (err, user) => {
				if (err)
					return res.status(401).json({ message: 'Invalid token' })
				if (user?.role === AuthRoles.ADMIN.toLowerCase()) return next()
				return res.status(403).json({ message: 'Unauthorized' })
			})
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	}
	// User is counselor
	userIsCounselor = async function (
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		const AuthTokenHeader = req.headers.authorization
		console.log(AuthTokenHeader)
		if (!AuthTokenHeader)
			return res.status(401).json({ message: 'No auth token provided' })
		try {
			const token = AuthTokenHeader?.split(' ')[1]
			return jwt.verify(token, SECRET_KEY, (err, user) => {
				if (err)
					return res.status(401).json({ message: 'Invalid token' })
				if (user?.role === AuthRoles.COUNSELOR.toLowerCase())
					return next()
				return res.status(403).json({ message: 'Unauthorized' })
			})
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	}
}

export const modelValidator = new UserValidator()
