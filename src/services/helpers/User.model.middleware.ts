import jwt from "jsonwebtoken"
import ExpressError from "./../../errors/errorRequest"
import { UserModel } from "./../../models/index"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRequest } from "../../types/request"
import { NextFunction, Response } from "express"
import { SECRET_KEY } from "./../../config"
class UserModelMiddleware {
	/**
	 * *********************** EMAILS *************************
	 */
	accountExist = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		const { email }: { email: string } = req.body
		const user = await UserModel.findOne({ email })
		if (user) {
			return next(new ExpressError("Email already exist", 400))
		}
		return next()
	}

	isRegistered = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { email }: { email: string } = req.body
			const user = await UserModel.findOne({ email })
			if (!user)
				throw new ExpressError(
					"User account does not exist please create one ",
					404,
				)
			return next()
		} catch (error) {
			return next(error)
		}
	}
	isActive = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { email }: { email: string } = req.body

			const user = await UserModel.findOne({ email })
			if (user?.isActive) {
				return next()
			}
			return next(new ExpressError("Please activate your account", 400))
		} catch (error) {
			return next(error)
		}
	}
	/**
	 * ********************** NAMES *********************
	 */
	isUserNameRegistered = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { username }: { username: string } = req.body
			const user = await UserModel.findOne({ username })
			if (!user) return next()
			throw new ExpressError("Username already registered", 400)
		} catch (error) {
			return next(error)
		}
	}

	/**
	 * ******************** PASSWORDS ************************
	 */
	isMatchCurrentPassword = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { currentPassword }: { currentPassword: string } = req.body

			const user = await UserModel.findById(req.user.userId).select(
				"+password",
			)

			if (await user?.comparePassword(currentPassword)) {
				return next()
			}
			return next(new ExpressError("Password don't match", 400))
		} catch (error) {
			return next(error)
		}
	}
	isValidActivationToken = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const activationToken = req.params.token
	
			if (!activationToken)
				return next(new ExpressError("No token provided", 400))
			jwt.verify(activationToken, SECRET_KEY!, async function (err, payload) {
				if (err) {
					return next(new ExpressError("Link has expired", 401))
				}
				req.user = payload
				return next()
			})
		} catch (e) {
			return next(e)
		}
	}

}

export default UserModelMiddleware
