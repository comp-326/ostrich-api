import { Request, Response, NextFunction } from 'express'
import ErrorResponse from './../../../middlewares/error'

// Email
export const emptyEmailField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { email }: { email: string | undefined } = req.body
		if (!email) throw new ErrorResponse('Email field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
// First name
export const emptyFirstnameField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { firstName }: { firstName: string | undefined } = req.body
		if (!firstName)
			throw new ErrorResponse('First name field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}

// Last name
export const emptylastNameField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { lastName }: { lastName: string | undefined } = req.body
		if (!lastName) throw new ErrorResponse('Last name field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
// username
export const emptyUserNameField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username }: { username: string | undefined } = req.body
		if (!username) throw new ErrorResponse('Username field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
export const emptyPasswordField = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { password }: { password: string | undefined } = req.body
		if (!password) throw new ErrorResponse('Password field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}

// Password match
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

		if (!(password === confirmPassword))
			throw new ErrorResponse('Passwords do not match', 400)
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
		const { password }: { password: string | undefined } = req.body
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const { passOK, errors } = passRegex(password!)
		if (!passOK) throw new ErrorResponse(errors, 400)
		else return next()
	} catch (e) {
		return next(e)
	}
}
//Validate passwordRegex
const passRegex = (password: string) => {
	let errors = ''
	if (password.search(new RegExp(/[a-z]+/)) < 0) {
		errors += 'Password must contain a Lowercase letter\n'
	}
	if (password.search(new RegExp(/[A-Z]+/)) < 0) {
		errors += 'Password must contain a Uppercase letter\n'
	}
	if (password.search(new RegExp(/[0-9]+/)) < 0) {
		errors += 'Password must contain a number\n'
	}
	if (password.length < 8) {
		errors += 'Password must be at least 8 characters\n	'
	}

	if (errors !== '') {
		return { passOK: false, errors }
	}
	return { passOK: true, errors }
}
