import { IRequest } from "../../types/request"
import { NextFunction, Response } from "express"
import ExpressError from "../../errors/errorRequest"
import passRegex from "../../utils/passRegex"
import { UserModel } from "../../models"

class UserMiddleware {
	validateUserRegistrationDetails = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { email, firstName, lastName } = req.body
			if (!email) {
				return next(new ExpressError("Email required", 400))
			}
			if (!firstName) {
				return next(new ExpressError("First name required", 400))
			}
			if (!lastName) {
				return next(new ExpressError("Last name required", 400))
			}

			return next()
		} catch (error) {
			return next(error)
		}
	}
	validatePasswordDetails = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { password, confirmPassword } = req.body
			if (!password) {
				return next(new ExpressError("Password required", 400))
			}
			if (!(password === confirmPassword)) {
				return next(new ExpressError("Passwords do not match", 400))
			}
			const { errors, passOK } = passRegex({ ...req.body })
			if (!passOK) {
				return next(new ExpressError(errors, 400))
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
	validateLoginDetails = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { email, password } = req.body
			if (!email) {
				return next(new ExpressError("Email required", 400))
			}
			if (!password) {
				return next(new ExpressError("Password required", 400))
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
	validateAccountDoesNotExist = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { email } = req.body
			const user = await UserModel.findByEmail(email)
			if (!user) {
				return next()
			}
			return next(new ExpressError("Email Account exist", 400))
		} catch (error) {
			return next(error)
		}
	}
	validateAccountExist = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { email } = req.body
			if (!email) {
				return next(new ExpressError("Email required", 400))
			}
			const user = await UserModel.findByEmail(email)
			if (user) {
				return next()
			}
			return next(new ExpressError("Email not registered", 400))
		} catch (error) {
			return next(error)
		}
	}
	validateAccountIsActive = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { email } = req.body
			if (!email) {
				return next(new ExpressError("Email required", 400))
			}
			const user = await UserModel.findByEmail(email)
			if (user.isActive) {
				return next()
			}
			return next(new ExpressError("Please activate your account", 400))
		} catch (error) {
			return next(error)
		}
	}
}

export default new UserMiddleware()
