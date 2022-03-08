import jwt from "jsonwebtoken"
import { IUserDocument } from './../../models/types/User.d';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRequest } from "./../../types/request.d"
import { NextFunction, Response } from "express"
import ExpressError from "./../../errors/errorRequest"
import passRegex from "./../../utils/passRegex"
import { UserModel } from "./../../models"
import { SECRET_KEY } from "./../../config"
class UserFormMiddleware {
	/**
	 * ***********************  EMAILS *******************
	 */

	emailField = async (req: IRequest, res: Response, next: NextFunction) => {
		const { email }: { email: string } = req.body
		if (!email) {
			return next(new ExpressError("Email field required", 400))
		}
		return next()
	}
	emptyEmailField = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		// console.log('Email body',req.body)
		try {
			const { email }: { email: string } = req.body
			if (!email) {
				return next(new ExpressError("Email is required", 400))
			}
			return next()
		} catch (e) {
			return next(e)
		}
	}

	/**
	 * ********************************** NAMES *************************
	 */
	usernameField = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { username }: { username: string } = req.body
			if (!username) {
				return next(new ExpressError("Username is required", 400))
			}
			return next()
		} catch (e) {
			return next(e)
		}
	}
	lastNameField = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { lastName }: { lastName: string } = req.body
			if (!lastName)
				throw new ExpressError("Last name field required", 400)
			return next()
		} catch (e) {
			return next(e)
		}
	}
	firstNameField = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { firstName }: { firstName: string } = req.body
			if (!firstName) {
				return next(new ExpressError("First name is required", 400))
			}
			return next()
		} catch (e) {
			return next(e)
		}
	}

	/**
	 * ****************************** PASSWORDS ****************************
	 */
	passwordField = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		const { password }: { password: string } = req.body
		if (!password) {
			return next(new ExpressError("Password field required", 400))
		}
		return next()
	}
	passwordFieldMatch = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		const {
			password,
			confirmPassword,
		}: { password: string; confirmPassword: string } = req.body
		if (!(password === confirmPassword)) {
			return next(new ExpressError("Passwords do not match", 400))
		}
		return next()
	}
	passwordRegex = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { passOK, errors } = passRegex(req.body)
			if (!passOK) {
				return next(new ExpressError(errors, 400))
			} else return next()
		} catch (e) {
			return next(e)
		}
	}
	confirmPasswordMatch = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const {
				password,
				confirmPassword,
			}: {
				password: string
				confirmPassword: string
			} = req.body

			if (!(password === confirmPassword)) {
				return next(new ExpressError("Passwords don't match", 400))
			}
			return next()
		} catch (e) {
			return next(e)
		}
	}
	confirmNewPasswordField = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { confirmNewPassword }: { confirmNewPassword: string } =
				req.body
			if (!confirmNewPassword) {
				return next(
					new ExpressError(
						"Confirm new password field required",
						400,
					),
				)
			}
			return next()
		} catch (e) {
			return next(e)
		}
	}
	newPasswordField = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { newPassword }: { newPassword: string } = req.body
			if (!newPassword) {
				return next(
					new ExpressError("New password cannot be empty", 400),
				)
			}
			return next()
		} catch (e) {
			return next(e)
		}
	}
	newPasswordMatchConfirmNewPassword = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const {
				newPassword,
				confirmNewPassword,
			}: { newPassword: string; confirmNewPassword: string } = req.body
			if (!(newPassword === confirmNewPassword)) {
				return next(new ExpressError("Passwords do not match", 400))
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
	currentPasswordField = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { currentPassword }: { currentPassword: string } = req.body
			if (!currentPassword) {
				return next(
					new ExpressError(
						"Please provide your current password",
						400,
					),
				)
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
	emailPasswordReset = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const password = req.body.newPassword

			const user: IUserDocument | null = <IUserDocument>(<unknown>UserModel
				.findById(req.user.userId)
				.select("+password +PasswordToken")!)
			if (user) {
				await user.hashPassword(password)
				return res.status(200).json({
					success: true,
					message: "Password updated successfully",
				})
			} else {

				return res.status(200).json({
					success: false,
					message: "Could not update",
				})
			}

		}
		catch (e) {
			return next(e)
		}
	}
	/**
 *
 *Check if the password link is already used
 */
	validPasswordResetLink = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const user = await UserModel.findById(req.user.userId).select("+PasswordToken")
			if (
				req.params.resetToken === user?.PasswordToken.value &&
				!user.PasswordToken.isUsed
			) {
				return next()
			}
			return next(new ExpressError("Password link already used", 401))
		} catch (err) {
			next(err)
		}
	}
	confirmPasswordResetToken = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const resetToken = req.params.resetToken
			if (!resetToken) return next(new ExpressError("Invalid link", 400))
			jwt.verify(resetToken, SECRET_KEY!, async function (err, payload) {
				if (err) {
					return next(new ExpressError("Reset link invalid", 401))
				}
				req.user = payload
				return next()
			})
		} catch (e) {
			return next(e)
		}
	}

	validAccountActivationToken = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const activationToken = req.params.token
			// console.log("Paramas", req.params)

			if (!activationToken)
				return next(new ExpressError("No token provided", 400))
			jwt.verify(activationToken, SECRET_KEY!, async function (err, payload) {
				if (err) {
					return next(new ExpressError("Link has expired", 401))
				}
				req.user = payload
				return next()
			})
		} catch (e) {
			return next(e)
		}
	}

}

export default UserFormMiddleware
