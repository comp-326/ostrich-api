/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Response, NextFunction } from 'express'

import ErrorResponse from './../../middlewares/error'
import User from './../../model/User.model'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from './../../config'
import { RequestType } from './types'
import { mailTransport, resetPasswordTemplate } from '../services/Mail.service'

export const login = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email } = req.body
		const user = await User.findOne({ email }).select('+password')
		if (!(await user!.passwordMatch(req.body.password)))
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
	req: RequestType,
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
		const { password, ...props } = newUser._doc
		const confirmToken = jwt.sign(
			{ userId: newUser._id },
			process.env.SECRET_KEY!,
		)
		await newUser.updateOne(
			{
				ActivationToken: { value: confirmToken, used: false },
			},
			{ new: true },
		)

		mailTransport.sendMail(
			{
				to: newUser.email,
				subject: 'Activate your account',
				html: `
			<div>
			<p>Please click the link below to activate your account</p>
			<a href="http://localhost:3000/auth/account/confirm/${confirmToken}>Activate account</a>
			</div>
			`,
			},
			async (err, info) => {
				if (err) {
					console.log('Could not send email', err)
				}
				if (info) console.log('Email sent successfully')
			},
		)
		return res.status(200).json({
			success: true,
			user: props,
			message:
				'Account created successfully, Check your email for activaioni',
		})
	} catch (error) {
		return next(error)
	}
}

export const confirmAccountEmail = async (
	req: RequestType,
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
			/**
			 * If the user token is invalid Throw an error
			 */
			if (err)
				return res.status(300).json({
					success: false,
					message: 'Account already activated',
				})
			/**
			/**
			 * Query user from database with the jwt payload
			 */
			const dbUser = await User.findOne({
				$and: [{ _id: payload!.userId }],
			}).select('+ActivationToken')
			/**
			 * Check if user exists
			 */
			if (!dbUser) {
				return next(new ErrorResponse('Account does not exist', 404))
			}
			/**
			 * Check if user is active
			 */
			if (dbUser?.isActive)
				return res.status(300).json({
					success: false,
					message: 'Account already activated',
				})
			/**
			 * Check if the JWT payload for user matches the Given db user
			 * If token do not match throw an exception for the invalid token
			 */
			if (!(dbUser?.ActivationToken.value === token)) {
				/**
				 * Check if the token is already used
				 * If used then return Already used and cannot be re-used
				 */
				if (dbUser?.ActivationToken.isUsed) {
					return res.status(400).json({
						success: false,
						message: 'Link already used and cannot be re-used',
					})
				}
				/**
				 * If the token is valid and it is not used
				 * Activate the user account
				 * Make the token used so that the link is invalid
				 */
				await dbUser!.updateOne(
					{
						isActive: true,
						ActivationToken: /**Toggle state */ { isUsed: true },
					},
					{ new: true },
				)
				return res.status(400).json({
					success: true,
					message: 'Account confirmation successful',
				})
			}
			/**
			 * If the token do not match then the token is invalid
			 * Still render the token used
			 */
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			await dbUser.updateOne(payload!.userId, {
				activationToken: { isUsed: true },
			})

			return res.status(200).json({
				message: 'Invalid token',
				success: true,
			})
		})
	} catch (e) {
		next(e)
	}
}

export const deleteUserAccount = async (
	req: RequestType,
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

export const forgotPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body
		const user = await User.findOne({ email })
		if (!user)
			return next(new ErrorResponse('Account email does not exist', 404))
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			SECRET_KEY!,
			{ expiresIn: '1h' },
		)
		mailTransport.sendMail(
			{
				to: user.email,
				subject: 'Password reset',
				html: resetPasswordTemplate(token),
			},
			async (err, _payload) => {
				if (err) {
					return next(
						new ErrorResponse(
							'Please check your email to reset your password',
							400,
						),
					)
					return
				}
			},
		)

		return res.status(200).json({ message: 'Register' })
	} catch (e) {
		next(e)
	}
}
export const resetPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	// 	// const user = await User.delete({ ...req.body })
	// 	const password = req.body.password
	// 	const decoded = jwt.decode(req.params.token)
	// 	await User.findByIdAndUpdate(

	// 		{ password },
	// 		{ new: true },
	// 	)
	return res.status(200).json({ message: 'Resetting password' })
	// } catch (e) {
	// 	next(e)
	// }
}

/**
 *
 *Get activation link to User account
 */
export const getActivationToken = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body
		const dbUser = await User.findOne({ email }).select('+ActivationToken')
		if (!dbUser) {
			return res.status(400).json({
				success: false,
				message:
					'The email provided is not registered with any account',
			})
		}
		const token = jwt.sign(
			{ userId: dbUser!._id, email: dbUser!.email, role: dbUser!.role },
			SECRET_KEY!,
			{ expiresIn: '1h' },
		)
		/**
		 * Set the activation link to the user instance
		 */
		await dbUser?.updateOne(
			{
				ActivationToken: { value: token, isUsed: false },
			},
			{ new: true },
		)
		mailTransport.sendMail(
			{
				to: dbUser!.email,
				subject: 'Activate your account',
				html: `
				<p>Hello ${dbUser!.firstName} ${
					dbUser!.lastName
					// eslint-disable-next-line indent
				} please click the link below to activate your account</p>
				<p>The link is only valid for 1hour</p>
<p><a href="http://localhost:3000/account/activate/${token}">Activate account</a></p>
				`,
			},
			async (err, payload) => {
				if (err) {
					console.log('Could not send email', err)
					next(new ErrorResponse('Could not send email', 500))
				}
				if (payload) {
					return res.status(200).json({
						success: true,
						message: 'Activation link sent to your email',
					})
				}
			},
		)
	} catch (e) {
		next(e)
	}
}
