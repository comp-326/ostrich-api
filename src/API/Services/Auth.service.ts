/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Response, NextFunction } from "express"

import ErrorResponse from "../../Middlewares/error"
import User from "../../Models/User.model"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../../config"
import { RequestType } from "./types"

import Availability from "./../../Models/Availability.model"
import Institution from "./../../Models/Institution.model"
import Workspace from "./../../Models/Workspace.model"
import Comment from "./../../Models/Comment.model"

export const login = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		// console.log('Body',req.body)

		const { email } = req.body
		const user = await User.findOne({ email }).select("+password")
		if (!(await user!.passwordMatch(req.body.password)))
			return res
				.status(401)
				.json({ success: false, message: "Check your login details" })

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
			{ expiresIn: "1h" },
		)
		const { password, ...props } = user!._doc
		return res.status(200).json({
			success: true,
			token,
			user: props,
			message: "Login successful",
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
		const uniqueName = `User#${new Date().getTime()}`
		// const hPassword = await hashPassword(req.body.password)
		const newUser = await User.create({
			...req.body,
			active: true,
			accountType: "basic",
			role: "user",
			username: uniqueName,
		})
		if (!newUser) throw new ErrorResponse("Account could not be created", 500)
		const { password, ...props } = newUser._doc
		const token = jwt.sign(
			{
				userId: props?._id,
				email: props?.email,
				role: props?.role,
			},
			SECRET_KEY!,
		)
		return res.status(200).json({
			success: true,
			user: props,
			token,
			message: "Account created successfully",
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
			throw new ErrorResponse("No auth confirmation token provided", 400)
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return jwt.verify(token, SECRET_KEY!, async (err, payload) => {
			/**
			 * If the user token is invalid Throw an error
			 */
			if (err)
				return res.status(300).json({
					success: false,
					message: "Account already activated",
				})
			/**
			/**
			 * Query user from database with the jwt payload
			 */
			const dbUser = await User.findOne({
				$and: [{ _id: payload!.userId }],
			}).select("+ActivationToken")
			/**
			 * Check if user exists
			 */
			if (!dbUser) {
				return next(new ErrorResponse("Account does not exist", 404))
			}
			/**
			 * Check if user is active
			 */
			if (dbUser?.isActive)
				return res.status(300).json({
					success: false,
					message: "Account already activated",
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
						message: "Link already used and cannot be re-used",
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
					message: "Account confirmation successful",
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
				message: "Invalid token",
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
	try {
		if (req.user.userId === req.params.userId) {
			await Availability.deleteMany({ user: req.user.userId })
			await Institution.deleteMany({ author: req.user.userId })
			await Workspace.deleteMany({ owner: req.user.userId })
			await Comment.deleteMany({ author: req.user.userId })
			await User.findByIdAndDelete(req.user.userId)
			return res.status(200).json({
				success: true,
				message: "Account deletion successful",
				user: {},
			})
		} else {
			return res
				.status(403)
				.json({ success: false, message: "You can oly delete your account" })
		}
	} catch (err) {
		next(err)
	}
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
		res.json({ message: "Activation of account" })
	} catch (err) {
		next(err)
	}
}


