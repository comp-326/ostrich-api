/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from "jsonwebtoken"
import { Response, NextFunction } from "express"
import { RequestType } from "./types"
import User from "./../../Models/User.model"
import { EMAIL_ACCOUNT, SECRET_KEY, WEB_CLIENT } from "./../../config"
import ErrorResponse from "./../../Middlewares/error"
import { passwordLink } from "./../../helpers/passwordResetLink"
import passRegex from "./../../helpers/passRegex"
import { hashPassword } from "../Middlewares/pass"
import { mailTransport, resetPasswordTemplate } from "../Cservices/Mail.service"

export const forgotPassword = async function (
	req: RequestType,
	res: Response,
	next: NextFunction,
) {
	try {
		return res.status(200).json({ message: "Forgot pasword" })
	} catch (e) {
		next(e)
	}
}
export const emailPasswordReset = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const password = req.body.newPassword

		User.findByIdAndUpdate(
			req.user.userId,
			{
				password: await hashPassword(password),
				PasswordToken: { isUsed: true, value: "" },
			},

			{ new: true },
		)
			.select("+password +PasswordToken")
			.exec(
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				async function (err, user) {
					if (err) {
						return res.status(200).json({
							success: false,
							message: "Could not update",
						})
					}
					return res.status(200).json({
						success: true,
						message: "Password updated successfully",
					})
				},
			)
	} catch (e) {
		next(e)
	}
}

/**
 *
 *Confirm new password regex
 */
export const newPasswordRegex = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { passOK, errors } = passRegex({
			password: req.body.newPassword!,
			...req.user,
		})
		if (!passOK) {
			return next(new ErrorResponse(errors, 400))
		}
		return next()
	} catch (e) {
		next(e)
	}
}
/**
 *
 *Update user password
 */
export const updateAccountPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		User.findByIdAndUpdate(
			req.userId,
			{
				password: await hashPassword(req.body.newPassword),
			},
			{ new: true },
		)
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
/**
 *
 *Send password reset link
 */
export const sendPasswordResetLink = async (
	req: RequestType,
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
			return next(new ErrorResponse("Please provide your device type", 400))
		}
		const user = await User.findOne({ email })
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
				subject: "Reset your account password",
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

/**
 *
 *Check if the password link is already used
 */
export const validPasswordResetLink = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.findById(req.user.userId).select("+PasswordToken")
		if (
			req.params.resetToken === user?.PasswordToken.value &&
			!user.PasswordToken.isUsed
		) {
			return next()
		}
		return next(new ErrorResponse("Password link already used", 401))
	} catch (err) {
		next(err)
	}
}
