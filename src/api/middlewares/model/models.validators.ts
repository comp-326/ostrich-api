import { Request, Response, NextFunction } from 'express'
import ErrorResponse from './../../../middlewares/error'
import User from './../../../model/User.model'

export const checkAccountActivation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body
		const user = await User.findOne({ email })
		if (!user?.active)
			throw new ErrorResponse('Please check your email and activate your account', 401)
		return next()
	} catch (error) {
		return next(error)
	}
}

export const checkAccountMailExist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body
		const user = await User.findOne({ email })
		if (!user)
			throw new ErrorResponse(
				'User account does not exist please create one ',
				404,
			)
		return next()
	} catch (error) {
		return next(error)
	}
}

export const checkRegisteredMail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body
		const user = await User.findOne({ email })
		if (!user) return next()
		throw new ErrorResponse('Email already registered', 400)
	} catch (error) {
		return next(error)
	}
}

export const checkRegistereduUserName = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username }: { username: string } = req.body
		const user = await User.findOne({ username })
		if (!user) return next()
		throw new ErrorResponse('Username already registered', 400)
	} catch (error) {
		return next(error)
	}
}
