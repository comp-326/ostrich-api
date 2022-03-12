/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { IRequest } from "../types/request"
import { EMAIL_ACCOUNT, SECRET_KEY, WEB_CLIENT } from "../config"
import ExpressError from "../errors/errorRequest"
import {
	AvailabilityModel,
	CommentModel,
	FolderModel,
	RoleModel,
	UserModel,
	WorkspaceModel,
} from "../models"
import {
	getEmailAccountConfirmationLinkMailTemplate,
	mailTransport,
	resetPasswordTemplate,
} from "./../Mailer/mailer"
import { passwordLink } from "../utils/passwordResetLinks"
import { IUserDocument } from "../models/types"
import verifyAccountLink from "../utils/verifyAccountLink"

class Auth {
	register = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			console.log("Registering")

			let sent = false
			const uniqueName = `User#${new Date().getTime()}`
			const defaultRole = await RoleModel.getDefaultRole()
			const newUser = await UserModel.create({
				...req.body,
				accountType: "basic",
				role: defaultRole,
				username: uniqueName,
			})
			await newUser.hashPassword(req.body.password)

			if (!newUser) throw new ExpressError("Account could not be created", 500)
			const { password, ...props } = newUser._doc
			const token = jwt.sign(
				{
					userId: props?._id,
					email: props?.email,
					role: props?.role,
				},
				SECRET_KEY!,
			)
			const link = await verifyAccountLink({
				device: "web",
				token,
				CLIENT_URL: WEB_CLIENT!,
			})
			const mailTemplate = getEmailAccountConfirmationLinkMailTemplate(link!)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			try {
				const res = await mailTransport.sendMail({
					to: req.body.email,
					from: EMAIL_ACCOUNT,
					html: mailTemplate,
				})
				res && (sent = true)
			} catch (err) {
				sent = false
			}
			// sent=true
			if (sent) {
				await newUser?.updateOne(
					{
						ActivationToken: { value: token, isUsed: false },
					},
					{ new: true },
				)
				return res.status(200).json({
					success: true,
					link,
					message:
						"Account created successfully, Please check your email to confirm your account",
				})
			}
		} catch (error) {
			console.log(error.message)

			return next(error)
		}
	}
	login = async function (req: IRequest, res: Response, next: NextFunction) {
		try {
			const {
				email,
				username,
				password,
			}: { email: string; username: string; password: string } = req.body
			const user = await await UserModel.findOne({
				$or: [{ email }, { username }],
			}).select("+password")
			if (!user) {
				return res
					.status(404)
					.json({ success: false, message: "User account not found" })
			}
			const passMatch = await user.comparePassword(password)
			if (passMatch) {
				const authToken = jwt.sign({ userId: user._id }, SECRET_KEY)
				const refreshToken = jwt.sign({ userId: user._id }, SECRET_KEY)
				const { password: _usedPass, ...props } = user._doc
				return res.status(200).json({
					success: true,
					user: props,
					authToken,
					refreshToken,
				})
			}

			return res
				.status(401)
				.json({ success: false, message: "Check your login details" })
		} catch (error) {
			return next(error)
		}
	}
	confirmAccountEmail = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const token = req.params.activationToken
			if (!token) {
				return next(new ExpressError("Please provide a valid token", 400))
			}
			return jwt.verify(token, SECRET_KEY!, async (err, payload) => {
				if (err) {
					return next(new ExpressError("Invalid activation link", 400))
				}
				if (payload) {
					const dbUser = await UserModel.findById(req.user?.userId).select(
						"+ActivationToken",
					)
					if (dbUser?.isActive) {
						return next(new ExpressError("Account already activated", 400))
					}
					if (dbUser?.ActivationToken.isUsed) {
						return next(new ExpressError("Activation link already used", 400))
					}
					await dbUser?.updateOne(
						{
							ActivationToken: { isUsed: true },
							isActive: true,
						},
						{ new: true },
					)
					return res.status(200).json({
						success: true,
						message: "Account activation successful",
					})
				}
			})
		} catch (e) {
			next(e)
		}
	}
	deleteUserAccount = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const authId = req.user.userId
			const paramId = req.params.id
			if (authId === paramId) {
				await AvailabilityModel.deleteMany({ user: req.user.userId })
				await FolderModel.deleteMany({ author: req.user.userId })
				await WorkspaceModel.deleteMany({ owner: req.user.userId })
				await CommentModel.deleteMany({ author: req.user.userId })
				await UserModel.findByIdAndDelete(req.user.userId)
				return res.status(200).json({
					success: true,
					message: "Account deletion successful",
					user: {},
				})
			}
			return res.status(403).json({
				success: false,
				message: "You can oly delete your account",
			})
		} catch (err) {
			return next(err)
		}
	}
	getActivationToken = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			let sent = false
			const { email }: { email: string } = req.body
			// Find user
			const user: IUserDocument | null = await UserModel.findOne({
				email,
			}).select("+ActivationToken")
			// Check if user account already activated
			if (!user) {
				return next(new ExpressError("User account does not exist", 400))
			}
			const token = jwt.sign({ userId: user?._id }, SECRET_KEY!, {
				expiresIn: "24h",
			})

			const link = await verifyAccountLink({
				device: "web",
				token,
				CLIENT_URL: WEB_CLIENT!,
			})
			const mailTemplate = getEmailAccountConfirmationLinkMailTemplate(link!)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			try {
				const res = await mailTransport.sendMail({
					to: email,
					from: EMAIL_ACCOUNT,
					html: mailTemplate,
					subject: "Account Activation",
				})
				res && (sent = true)
			} catch (err) {
				// console.log(err)

				sent = false
			}
			if (sent) {
				await user?.updateOne(
					{
						ActivationToken: { value: token, isUsed: false },
					},
					{ new: true },
				)
				return res.status(200).json({
					success: true,
					message: "Please check your email to confirm your account",
				})
			}
			return next(new ExpressError("Could not send email", 400))
			// Send confirmation link if inactive
		} catch (err) {
			next(err)
		}
	}
	forgotPassword = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			return res.status(200).json({ message: "Forgot password" })
		} catch (e) {
			return next(e)
		}
	}

	emailPasswordReset = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const password = req.body.newPassword

			const user: IUserDocument | null = <IUserDocument | null>(
				(<unknown>UserModel.findById(req.user.userId).select("+password")!)
			)
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
		} catch (e) {
			return next(e)
		}
	}
	updateAccountPassword = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			UserModel.findById(req.userId)
				.select("+password")
				.exec(async (err, user) => {
					if (err) {
						return next(err)
					}
					user &&
						res.status(200).json({
							success: true,
							message: "Account password successfully changed",
						})
				})
		} catch (err) {
			next(err)
		}
	}
	sendPasswordResetLink = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			let sent = false
			const {
				email,
				device,
			}: {
				email: string
				device: string
			} = req.body
			if (!device) {
				return next(new ExpressError("Please provide your device type", 400))
			}
			const user = await UserModel.findOne({ email })
			const confirmationToken = jwt.sign(
				{
					userId: user?._id,
					email,
					firstName: user?.firstName,
					lastName: user?.lastName,
				},
				SECRET_KEY!,
			)
			await user?.updateOne(
				{
					PasswordToken: {
						value: confirmationToken,
						isUsed: false,
					},
				},
				{ new: true },
			)
			const link = passwordLink({
				CLIENT_RESET_URL: WEB_CLIENT!,
				device: device,
				token: confirmationToken,
			})
			const mailTemplate = resetPasswordTemplate(link)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			try {
				const res = await mailTransport.sendMail({
					to: email,
					from: EMAIL_ACCOUNT,
					html: mailTemplate,
					subject: "Reset your password",
				})
				res && (sent = true)
			} catch (err) {
				sent = false
			}

			if (!sent) {
				return res.status(400).json({
					success: false,
					message: "Could not send email",
				})
			}
			return res.status(200).json({
				success: true,
				message: "Check your email reset your password",
			})
		} catch (e) {
			next(e)
		}
	}
	validPasswordResetLink = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const user = await UserModel.findById(req.user.userId).select(
				"+PasswordToken",
			)
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
			const activationToken = req.params.activationToken
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
export default Auth
