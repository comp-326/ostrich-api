import { RequestType } from "./../../Services/types/index.d"
import { Request, Response, NextFunction } from "express"
import ErrorResponse from "../../../Middlewares/error"
import User from "../../../Models/User.model"
import Workspace from "../../../Models/Workspace.model"

export const checkAccountActivation = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body
		const user = await User.findOne({ email })
		if (!user?.isActive)
			throw new ErrorResponse(
				"Please check your email and activate your account",
				401,
			)
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
				"User account does not exist please create one ",
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
		throw new ErrorResponse("Email already registered", 400)
	} catch (error) {
		return next(error)
	}
}
export const checkWorkspaceExist = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const workspaceId = req.params.workspaceId

		const workspace = await Workspace.findById(workspaceId)

		if (workspace) {
			return next()
		}
		throw new ErrorResponse("Invalid workspace provided", 400)
	} catch (error) {
		return next(error)
	}
}

export const checkRegisteredUserName = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username }: { username: string } = req.body
		const user = await User.findOne({ username })
		if (!user) return next()
		throw new ErrorResponse("Username already registered", 400)
	} catch (error) {
		return next(error)
	}
}

/**
 * Check if the current user password is correct
 * If the password does not match then that is a
 * malicious account activity and thus return some error
 */
export const matchCurrentPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { currentPassword }: { currentPassword: string } = req.body

		const user = await User.findById(req.user.userId).select("+password")

		if (await user?.passwordMatch(currentPassword)) {
			return next()
		}
		return next(new ErrorResponse("Password don't match", 400))
	} catch (error) {
		return next(error)
	}
}

/**
 * Check if the current user password is correct
 * If the password does not match then that is a
 * malicious account activity and thus return some error
 */
export const activeUser = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string } = req.body

		const user = await User.findOne({ email })
		if (user?.isActive) {
			return next()
		}
		return next(new ErrorResponse("Please activate your account", 400))
	} catch (error) {
		return next(error)
	}
}

/**
 * Check if the user is providing the same password they
 * used initially. This does not need any change and should
 * not reach the database.
 * Let the user try out some other password
 */
export const newPasswordMatchOldPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { newPassword }: { newPassword: string } = req.body
		const user = await User.findById(req.user.userId).select("+password")
		if (await user?.passwordMatch(newPassword)) {
			return next(
				new ErrorResponse("You cannot set your old password again", 400),
			)
		}
		return next()
	} catch (error) {
		return next(error)
	}
}

/**
 * Check if the user's new password matches the confirm
 * password. If they don't match then don't populate the
 * database with unmatching values
 */
export const newPasswordMatchConfirmNewPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			newPassword,
			confirmNewPassword,
		}: { newPassword: string; confirmNewPassword: string } = req.body
		if (!(newPassword === confirmNewPassword)) {
			return next(new ErrorResponse("Passwords do not match", 400))
		}
		return next()
	} catch (error) {
		return next(error)
	}
}

/**
 * Check if the user's new password matches the confirm
 * password. If they don't match then don't populate the
 * database with unmatching values
 */
export const emptyCurrentPassword = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { currentPassword }: { currentPassword: string } = req.body
		if (!currentPassword) {
			return next(
				new ErrorResponse("Please provide your current password", 400),
			)
		}
		return next()
	} catch (error) {
		return next(error)
	}
}
