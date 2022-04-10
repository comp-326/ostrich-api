import {Model} from "mongoose"
import {SECRET_KEY} from "./../config"
import jwt from "jsonwebtoken"
import IRequest from "../common/interfaces/request"
import { NextFunction, Response } from "express"
import ErrorResponse from "../ErrorHandler/ErrorResponse"
import emailRegex from "../constants/emailRegex"
import passwordUtils from "../helpers/password"
import { deleteFile } from "../helpers/fileSystem"
import Usermodel from "./../models/UserModel"



class UserMiddleware {
	/**
	 *
	 * @param {user:Model} user
	 */
	constructor(private user:typeof Model) {
	}
	/**
	 * *******************  VERIFY PROVIDED LINK
	 */
	verifyLinkToken = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const token = req.params.token
			if (!token) {
				return res
					.status(400)
					.json({ success: false, message: "Invalid link" })
			}
			jwt.verify(token, SECRET_KEY, async (err, payload) => {
				if (err) {
					return res
						.status(400)
						.json({ success: false, message: "Invalid link" })
				}
				console.log(payload)
				req.user = payload
				return next()
			})
		} catch (error) {
			return next(error)
		}
	}
	/***
	 * *********************** UPLOAD USER PROFILE PIC ****************
	 */
	uploadProfilePic = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			// const { secure_url } = uploadSDK.uploader.upload(req.file!.path)
			console.log("here",req.file)
			if (req.file) {
				const fileName = req.file.filename
				const user = await this.user.findByIdAndUpdate(req.user.userId,{profilePic:{url:fileName,public_id:new Date().getTime()}},{new:true})
				if(user){
					return res.status(200).json({ message: "Upload Success" ,user})
				}
				deleteFile(req.file.path)
				return res.status(400).json({message:"Invalid details file deleted",})
			}
			// return res.status(200).json({ message: "Upload failed" })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 * *********************** VALIDATE REGISTRATION DETAILS ************
	 */
	validateRegistrationData = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { firstName, lastName, password, email, confirmPassword } =
				req.body
			if (!firstName) {
				return next(new ErrorResponse("First name required", 400))
			}
			if (!email) {
				return next(new ErrorResponse("Email required", 400))
			}
			// eslint-disable-next-line no-useless-escape
			if (!emailRegex.test(email)) {
				return next(new ErrorResponse("Please provide a valid email", 400))
			}
			if (!lastName) {
				return next(new ErrorResponse("Last name required", 400))
			}
			if (!password) {
				return next(new ErrorResponse("Password name required", 400))
			}
			if (!confirmPassword) {
				return next(new ErrorResponse("Passwords don't match", 400))
			}
			const user = await this.user.findOne({ email })
			if (user) {
				return next(new ErrorResponse("User email already registered", 409))
			}
			const { passOK, errors } = passwordUtils.passwordRegex({
				props: req.body,
				fields: [
					{ fieldName: "firstName", name: "First name" },
					{ fieldName: "lastName", name: "Last name" },
					{ fieldName: "email", name: "Email" },
				],
			})

			if (!passOK) {
				return next(new ErrorResponse(errors, 400))
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
}

export default new UserMiddleware(Usermodel)
