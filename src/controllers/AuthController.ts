import {Model} from "mongoose"
import jwt from "jsonwebtoken"
import IRequest from "../common/interfaces/request"
import { NextFunction, Response } from "express"
import templates from "../mail/templates"
import { createAccountActivationLink } from "../constants/CreateLink"
import { EMAIL_ACCOUNT, SECRET_KEY } from "../config"
import { mailTransport } from "../mail"
import passwordUtils from "../helpers/password"
import RoleModel from "../models/RoleModel"
import UserModel from "../models/UserModel"

class AuthController {
	constructor(private user:typeof Model, private role:typeof Model) {
		
	}
	createAccount = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			let emailSent = false
			const hpass = await passwordUtils.hashPass(String(req.body.password))
			req.body.password = hpass

			const defaultRole = await this.role.findOne({ default: true })

			const newUser = new this.user({ ...req.body, role: defaultRole })
			const savedUser = await newUser.save()
			// eslint-disable-next-line no-unused-vars
			const { password: _pass, _id: id } = savedUser._doc
			const token = jwt.sign({ userId: savedUser._id }, SECRET_KEY, {
				expiresIn: "24h",
			})
			const link = createAccountActivationLink({ token })
			const template =templates.EmailActivationTemp({ ...req.body, link })
			try {
				const res = await mailTransport.sendMail({
					to: req.body.email,
					subject: "Activate your account",
					html: template,
					from: EMAIL_ACCOUNT,
				})
				res && (emailSent = true)
			} catch (err) {
				err && (emailSent = false)
			}

			if (req.file && req.file.fieldname === "profile") {
				req.user.userId = savedUser._id
				return next()
			}

			if (emailSent) {
				return res.status(200).json({
					link,
					message:
						"User created successfully please check your email to activate your account",
					id,
				})
			}
			return res.status(200).json({
				message: "User created successfully but could not send email",
				id,
			})
		} catch (error) {
			return next(error)
		}
	}
	login = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { email, password: userPass } = req.body
			if (!email) {
				return res.status(400).json("Email required")
			}
			if (!userPass) {
				return res.status(400).json("Password required")
			}
			const user = await this.user
				.findOne({ email })
				.select("+password")
				.populate("role", "name -_id")
			if (!user) {
				return res.status(400).json("Please create account to login")
			}
			if (!user.isActive) {
				return res
					.status(400)
					.json("Please activate your account to login")
			}
			const match = await user.comparePassword(userPass)
			if (!match) {
				return res.status(400).json("Incorrect Email or password")
			}
			const authToken = jwt.sign({ userId: user._id }, SECRET_KEY, {
				expiresIn: "1h",
			})
			const refreshToken = jwt.sign({ userId: user._id }, SECRET_KEY)
			// eslint-disable-next-line no-unused-vars
			const { password: _pass, ...props } = user._doc
			return res.status(200).json({
				success: true,
				message: "Successful login",
				user: props,
				authToken,
				refreshToken,
			})
		} catch (error) {
			return next(error)
		}
	}
}

export default new AuthController(UserModel, RoleModel)
