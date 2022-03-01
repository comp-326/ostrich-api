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
		const dbUser = await User.findById(req.user.userId).populate("availability")
		// console.log(dbUser)

		if (!dbUser) {
			throw new ErrorResponse("No profile data", 400)
		} else {
			const { password, ...user } = dbUser._doc
			return res.status(200).json({ success: true, user })
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
		const newAvailability = new Availability({
			days: [...req.body.days],
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			user: req.user.userId,
		})
		const savedAvailability = await newAvailability.save()
		const user = await User.findByIdAndUpdate(
			req.user.userId,
			{
				$push: { availability: savedAvailability },
			},
			{ new: true },
		).populate("availability")
		return res.status(200).json({
			success: true,
			user,
			availability: savedAvailability,
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
		User.findByIdAndUpdate(
			req.user.userId,
			{
				$pull: { availability: availabilityId },
			},
			{ new: true },
		)
			.populate("availability")
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
