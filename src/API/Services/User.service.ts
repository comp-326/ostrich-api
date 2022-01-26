/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from "express"
import ErrorResponse from "../../Middlewares/error"
import User from "../../Models/User.model"
import Availability from "./../../Models/Availability.model"
import { RequestType } from "./types"

export const getUserById = async function (
	req: RequestType,
	res: Response,
	next: NextFunction,
) {
	try {
		User.findById(req.params.id).exec(async function (err, user) {
			if (err) {
				return next(err)
			}
			if (!user) {
				return next(new ErrorResponse("User not found", 404))
			}
			return res.status(200).json({ success: true, profile: user })
		})
	} catch (error) {
		next(error)
	}
}
export const getUser = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, firstName, lastName, username } = req.query
		const user = await User.findOne({
			$or: [{ email }, { username }, { firstName }, { lastName }],
		}).populate("availability", "availability")
		if (!user) {
			throw new ErrorResponse("User not found", 404)
		}
		return res.status(200).json({ message: "Success", success: true, user })
	} catch (error) {
		next(error)
	}
}
export const getUsers = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await User.find()
			.limit(20)
			.populate("availablility", "availability")
		if (!users.length) {
			throw new ErrorResponse("No User data found", 404)
		} else {
			return res.status(200).json({ success: true, users })
		}
	} catch (error) {
		next(error)
	}
}
export const userProfile = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.findById(req.params.id).populate(
			"availability",
			"availability",
		)
		if (!user) {
			throw new ErrorResponse("No profile data", 400)
		} else {
			return res.status(200).json({ success: true, profile: user })
		}
	} catch (error) {
		next(error)
	}
}
/**
 * Update user profile
 */

export const updateUserProfile = async function (
	req: RequestType,
	res: Response,
	next: NextFunction,
) {
	try {
		User.findByIdAndUpdate(
			req.user.userId,
			{ ...req.body },
			{ new: true },
		).exec(async function (err, user) {
			if (err) {
				return next(err)
			}
			return res.status(200).json({
				success: true,
				message: "Successfully updated your profile",
				user,
			})
		})
	} catch (error) {
		next(error)
	}
}
/**
 * Create user availability
 */
export const createAvailability = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const availability = await Availability.create({
			...req.body,
			user: req.user.userId,
		})
		const user = User.findByIdAndUpdate(req.user.userId, {
			$push: { availability: availability._id },
		}).populate("availability", "availability")
		return res.status(200).json({
			success: true,
			user,
			message: "Suceesfully added your availability",
		})
	} catch (error) {
		next(error)
	}
}

/**
 * Delete user availability
 */
export const deleteAvailability = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const availabilityId = req.params.availabilityId
		await Availability.findByIdAndDelete(availabilityId)
		User.findByIdAndUpdate(req.user.userId, {
			$pull: { availability: availabilityId },
		})
			.populate("availability", "availability")
			.exec(async function (err, user) {
				if (err) {
					return next(err)
				}
				return res.status(200).json({
					success: true,
					user,
					message: "Suceesfully deleted your availability",
				})
			})
	} catch (error) {
		next(error)
	}
}
