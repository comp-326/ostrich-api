/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from "express"
import passRegex from "./../../../helpers/passRegex"
import ErrorResponse from "../../../Middlewares/error"

/**
 * Check if the user has provided email for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptyEmailField = async function (
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// console.log('Email body',req.body)
	try {
		const { email }: { email: string | undefined } = req.body
		if (!email) {
			return next(new ErrorResponse("Email is required", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}
/**
 * Check if the user has provided their first name for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptyFirstnameField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { firstName }: { firstName: string | undefined } = req.body
		if (!firstName) {
			return next(new ErrorResponse("First name is required", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}
/**
 * Check if the user has provided their last name for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptylastNameField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { lastName }: { lastName: string | undefined } = req.body
		if (!lastName) throw new ErrorResponse("Last name field required", 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
/**
 * Check if the user has provided their username for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptyUserNameField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username }: { username: string | undefined } = req.body
		if (!username) {
			return next(new ErrorResponse("Username is required", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}
/**
 * Check if the user has provided password they expect to
 * use for account access first for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptyPasswordField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { password }: { password: string | undefined } = req.body
		if (!password) {
			return next(new ErrorResponse("Password is required", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}
/**
 * Check if the user has provided new password they expect to
 * use for account access first for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptyNewPassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { newPassword }: { newPassword: string | undefined } = req.body
		if (!newPassword) {
			return next(new ErrorResponse("New password cannot be empty", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}

/**
 * Check if the user has provided new password they expect to
 * use for account access first for the form
 * submission
 * If not, Make the user resend it with the next request
 */
export const emptyConfirmNewPassword = async function (
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { confirmNewPassword }: { confirmNewPassword: string | undefined } =
			req.body
		if (!confirmNewPassword) {
			return next(new ErrorResponse("Confirm new password field required", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}
/**
 * Check i the user combination of passwords do match
 * otherwise resend matching passwords to go through
 * this step
 */
export const confirmPasswordMatch = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			password,
			confirmPassword,
		}: {
			password: string | undefined
			confirmPassword: string | undefined
		} = req.body

		if (!(password === confirmPassword)) {
			return next(new ErrorResponse("Passwords don't match", 400))
		}
		return next()
	} catch (e) {
		return next(e)
	}
}

// PasswordRegex match
export const passwordRegex = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { passOK, errors } = passRegex(req.body)
		if (!passOK) {
			return next(new ErrorResponse(errors, 400))
		} else return next()
	} catch (e) {
		return next(e)
	}
}
