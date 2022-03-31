import {Model} from "mongoose"
import passwordUtils from "../helpers/password"
import jwt from "jsonwebtoken"
import { createForgotPasswordLink } from "../constants/CreateLink"
import { EMAIL_ACCOUNT, PORT, SECRET_KEY } from "../config"
import templates from "../mail/templates"
import { mailTransport } from "../mail"
import userModel from "./../models/UserModel"
import ErrorResponse from "../ErrorHandler/ErrorResponse"
import IRequest from "../common/interfaces/request"
import { NextFunction, Response } from "express"
import { JWTPayloadType } from "../common/UserPayloadType"



class UserController {
	constructor(private user:typeof Model) {
		this.user = user
	}
	/**
	 ****************** UPDATE USER DETAILS ********************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	updateUserDetails = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			if (req.body.password) {
				req.body.password = await passwordUtils.hashPass(
					String(req.body.password),
				)
			}
			if (req.user.userId === req.params.id) {
				const user = await this.user.findByIdAndUpdate(
					req.user.userId,
					{ ...req.body },
					{ new: true },
				)
				if (req.file && req.file.fieldname === "profile") {
					req.user.userId = user._id
					return next()
				}
				return res
					.status(200)
					.json({message:"Profile successfully updated", user})
			}
			return res.status(400).json("Could not update user details")
		} catch (error) {
			return next(error)
		}
	}
	/**
	 **************** GET INDIVIDUAL USER DETAILS ****************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getUsers = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { limit, page } = req.params
			if (limit && page) {
				const users = await this.user
					.find({})
					.limit(Number(limit))
					.skip((Number(page) - 1) * Number(limit))
				if (users) {
					return res.status(200).json({ success: true, users })
				}
				return res
					.status(404)
					.json({ message: "User data not found", users: [] })
			}
			const users = await this.user.find({}).limit(100).skip(0)
			if (users) {
				return res.status(200).json({ success: true, users })
			}
			return res
				.status(404)
				.json({ message: "User data not found", users: [] })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ********************* QUERY USER BY ID **********************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getUserById = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const user = await this.user.findById(req.params.id)
			if (user) {
				return res.status(200).json({ message: "Success", user })
			}
			return res
				.status(200)
				.json({ success: false, message: "Failed", user: null })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ********************* ACTIVATE EXISTING ACCOUNT **************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	activateAccount = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { userId } = req.user
			console.log("Req user", userId)
			const user = await this.user.findById(userId)
			console.log("User", user)
			if (user) {
				if (user.isActive) {
					return res
						.status(200)
						.json({ message: "Account already activated" })
				}
				await user.updateOne({
					isActive: true,
					activationToken: { value: "", used: true },
				})
				return res
					.status(200)
					.json({ message: "Account activation success", user })
					.redirect("/auth/login")
			}
			return res
				.status(200)
				.json({ success: false, message: "Failed", user: null })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ******************* GET PASSWORD RESET LINK ******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	forgotPassword = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { email } = req.body
			if (!email) {
				return next(new ErrorResponse("Please provide an email",400))
			}
			const user = await this.user.findOne({ email })
			if (!user) {
				return next(new ErrorResponse("Account does not exist",400))
			}
			const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
				expiresIn: "24h",
			})
			const link = createForgotPasswordLink({
				baseUrl: `http://localhost:${PORT}/auth/account/forgot`,
				token,
			})
			const template = templates.ForgotPasswordTemp({
				link,
				firstName: user.firstName,
				lastName: user.lastName,
			})
			let sent = false
			try {
				const res = await mailTransport.sendMail({
					html: template,
					to: email,
					subject: "Reset password",
					from: EMAIL_ACCOUNT,
				})
				res && (sent = true)
			} catch (error) {
				error && (sent = true)
			}
			if (sent) {
				return res.status(200).json({
					message: "Please check your email to reset your password",
				})
			}
			return next(new ErrorResponse("Could not snd email", 400))
		} catch (err) {
			return next(err)
		}
	}
	/**
	 ******************* RESET USER PASSWORD******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	resetPassword = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { token } = req.params
			if (!token) {
				return next(new ErrorResponse("Invalid reset link",400))
			}
			if (!req.body.password) {
				return next(new ErrorResponse("Password required", 400))
			}
			if (!(req.body.password === req.body.confirmPassword)) {
				return next(new ErrorResponse("Passwords do not match",400))
			}
			return jwt.verify(token, SECRET_KEY, async (err, payload) => {
				if (err) {
					return res
						.status(401)
						.json({ message: "Link has already expired" })
				}
				const decodedToken = payload as JWTPayloadType
				const user = await this.user.findById(decodedToken.userId)
				if (user) {
					const { firstName, lastName } = user._doc
					const passHash = await passwordUtils.hashPass(req.body.password)
					const { errors, passOK } = passwordUtils.passwordRegex({
						props: {
							firstName,
							lastName,
							password: req.body.password,
						},
						fields: [
							{ fieldName: "firstName", name: "First Name" },
							{ fieldName: "lastName", name: "Last Name" },
						],
					})
					if (!passOK) {
						return next(new ErrorResponse(errors, 400))
					}
					await user.updateOne({ password: passHash })
					return res
						.status(200)
						.json({ message: "Password update success" })
				}
				return res.status(400).json({ message: "Invalid link" })
			})
		} catch (err) {
			return next(err)
		}
	}
}

export default new UserController(userModel)
