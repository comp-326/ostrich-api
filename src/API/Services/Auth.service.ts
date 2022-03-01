import { activateAccountTemplate } from "./../Cservices/Mail.service"
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Response, NextFunction } from "express"

import ErrorResponse from "../../Middlewares/error"
import User from "../../Models/User.model"
import jwt from "jsonwebtoken"
import { EMAIL_ACCOUNT, SECRET_KEY, WEB_CLIENT } from "../../config"
import { RequestType } from "./types"

import Availability from "./../../Models/Availability.model"
import Institution from "./../../Models/Institution.model"
import Workspace from "./../../Models/Workspace.model"
import Comment from "./../../Models/Comment.model"
import verifyAccountLink from "./../../helpers/verifyAccountLink"
import {
	getEmailAccountConfirmationLinkMailTemplate,
	mailTransport,
} from "../Cservices/Mail.service"

export const login = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		// console.log('Body',req.body)

		const { email } = req.body
		const user = await User.findOne({ email }).select("+password +fisTime")
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
		let sent = false
		const uniqueName = `User#${new Date().getTime()}`
		// const hPassword = await hashPassword(req.body.password)
		const newUser = await User.create({
			...req.body,
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
		const link = await verifyAccountLink({
			device: "web",
			token,
			CLIENT_URL: WEB_CLIENT!,
		})
		const mailTemplate = activateAccountTemplate(link!)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		try {
			const res = await mailTransport.sendMail({
				to: req.body.email,
				from: EMAIL_ACCOUNT,
				html: mailTemplate,
				textEncoding: "base64",
				subject: "Activate your account",
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
			return next(new ErrorResponse("Please provide a valid token", 400))
		}
		return jwt.verify(token, SECRET_KEY!, async (err, payload) => {
			if (err) {
				return next(new ErrorResponse("Invalid activation link", 400))
			}
			if (payload) {
				const dbUser = await User.findById(req.user?.userId).select(
					"+ActivationToken",
				)
				if (dbUser?.isActive) {
					return next(new ErrorResponse("Account already activated", 400))
				}
				if (dbUser?.ActivationToken.isUsed) {
					return next(new ErrorResponse("Activation link already used", 400))
				}
				await dbUser?.updateOne(
					{
						ActivationToken: { isUsed: true },
						isActive: true,
					},
					{ new: true },
				)
				return res
					.status(200)
					.json({ success: true, message: "Account activation successful" })
			}
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
		let sent = false
		const { email }: { email: string } = req.body
		// Find user
		const user = await User.findOne({ email }).select("+ActivationToken")
		// Check if user account already activated
		if (!user) {
			return next(new ErrorResponse("User account does not exist", 400))
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
		return next(new ErrorResponse("Could not send email", 400))
		// Send confirmation link if inactive
	} catch (err) {
		next(err)
	}
}
