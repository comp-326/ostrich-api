/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from "../models/index"
import { IRequest } from "../types/request"
import { Response, NextFunction } from "express"
import ExpressError from "../errors/errorRequest"
import { IUserDocument } from "./../models/types"

class User {
	getAllUsers = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const users = await UserModel.find().populate(
				"role",
				"name -_id permissions",
			)
			if (users.length < 1) {
				return res
					.status(404)
					.json({ success: true, message: "No users found" })
			}
			return res.status(200).json({ success: true, users })
		} catch (error) {
			return next(error)
		}
	}
	getUserById = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			UserModel.findById(req.params.id).exec(async function (err, user) {
				if (err) {
					return next(err)
				}
				if (!user) {
					return next(new ExpressError("User not found", 404))
				}
				return res.status(200).json({ success: true, profile: user })
			})
		} catch (error) {
			next(error)
		}
	}
	getUser = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { email, firstName, lastName, username } = req.query
			const user = await UserModel.findOne({
				$or: [{ email }, { username }, { firstName }, { lastName }],
			}).populate("availability")
			if (!user) {
				throw new ExpressError("User not found", 404)
			}
			return res
				.status(200)
				.json({ message: "Success", success: true, user })
		} catch (error) {
			next(error)
		}
	}
	updateProfile = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const user: IUserDocument | null = <IUserDocument>(<unknown>UserModel.findByIdAndUpdate(req.user.userId, { ...req.body },
				{ new: true }))
			if (user) {
				if (req.body.password) {
					await user.hashPassword(req.body.password)
				}
				return res.status(200).json({ success: true, message: "User profile update success" })
			}
			return res.json({})

		} catch (error) {
			return next(error)
		}
	}
	updatePassword = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const user: IUserDocument | null = <IUserDocument>(<unknown>UserModel.findById(req.user.userId
			))
			if (user) {
				if (req.body.password) {
					await user.hashPassword(req.body.password)
				}
				return res.status(200).json({ success: true, message: "User profile update success" })
			}
			return res.json({})

		} catch (error) {
			return next(error)
		}
	}
}

export default User
