/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import ErrorResponse from './../../middlewares/error'
import User from './../../model/User.model'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from './../../config'
// import { confirmPassword } from '../middlewares/pass'
// import { confirmPassword } from '../middlewares/pass'

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email } = req.body
		const user = await User.findOne({ email }).select('+password')

		const p_match = await user!.passwordMatch(req.body.password)
		console.log(p_match)

		if (!p_match)
			return res
				.status(401)
				.json({ success: false, message: 'Check your login details' })

		const token = jwt.sign(
			{
				userId: user?._id,
				email: user?.email,
				role: user?.role,
				firstName: user?.firstName,
				lastName: user?.lastName,
				profile: user?.profilePic,
				gender: user?.gender,
			},
			SECRET_KEY!,
			{ expiresIn: '1h' },
		)
		const { password, ...props } = user!._doc
		return res.status(200).json({
			success: true,
			token,
			user: props,
			message: 'Login successful',
		})
	} catch (error) {
		return next(error)
	}
}

export const register = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// const hPassword = await hashPassword(req.body.password)
		const newUser = await User.create({
			...req.body,
			role: 'user',
		})
		if (!newUser)
			throw new ErrorResponse('Account could not be created', 500)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...props } = newUser._doc
		return res.status(200).json({
			success: true,
			user: props,
			message:
				'User account created please check your email to confirm your account',
		})
	} catch (error) {
		return next(error)
	}
}

export const confirmAccountEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.params.token
		if (!token) {
			throw new ErrorResponse('No auth confirmation token provided', 400)
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return jwt.verify(token, SECRET_KEY!, async (err, payload) => {
			if (err) throw new ErrorResponse('Invalid or expired token', 400)
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const user = await User.findById(payload!.userId)
			if (user?.active)
				throw new ErrorResponse('Account already registered', 400)
			await User.updateOne({ active: true })
			return res.status(200).json({
				message: 'Account activated successfully',
				success: true,
			})
		})
	} catch (e) {
		next(e)
	}
}

export const deleteUserAccount = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// try {
	// const user = await User.delete({ ...req.body })
	return res.status(200).json({ message: 'Register' })
	// } catch (e) {
	// next(e)
	// }
}
