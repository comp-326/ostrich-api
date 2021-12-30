/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import ErrorResponse from './../../middlewares/error'
import User from '../../model/User.model'

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) {
			throw new ErrorResponse('No user found', 400)
		} else {
			return res.status(200).json({ success: true, profile: user })
		}
	} catch (e) {
		next(e)
	}
}
export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email, firstName, lastName, username } = req.query
		const user = await User.findOne({
			$or: [{ email }, { username }, { firstName }, { lastName }],
		})
		if (!user) {
			throw new ErrorResponse('User not found', 404)
		}
		return res.status(200).json({ message: 'Success', success: true, user })
	} catch (e) {
		next(e)
	}
}
export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await User.find().limit(20)
		if (!users.length) {
			throw new ErrorResponse('No User data found', 404)
		} else {
			return res.status(200).json({ success: true, users })
		}
	} catch (e) {
		next(e)
	}
}
export const userProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.findById(req.params.id)
		if (!user) {
			throw new ErrorResponse('No profile data', 400)
		} else {
			return res.status(200).json({ success: true, profile: user })
		}
	} catch (e) {
		next(e)
	}
}
export const updateUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
			},
			{ new: true },
		)
		return res.status(200).json({ success: true, user })
	} catch (e) {
		next(e)
	}
}
