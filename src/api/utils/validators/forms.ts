import { Request, Response, NextFunction } from 'express'
import passwordRegex from './passwordRegex'

class FormValidator {
	emptyEmailField = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { email } = req.body
		if (!email)
			return res.status(405).json({ message: 'Email field is required' })
		return next()
	}

	emptyFirstNameField = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { firstName } = req.body
		if (!firstName)
			return res
				.status(405)
				.json({ message: 'First name field is required' })
		return next()
	}
	emptyLastNameField = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { lastName } = req.body
		if (!lastName)
			return res
				.status(405)
				.json({ message: 'Last name field is required' })
		return next()
	}
	emptyPasswordField = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { password } = req.body
		if (!password)
			return res
				.status(405)
				.json({ message: 'Password field is required' })
		return next()
	}
	passwordEqualConfirmPasswordField = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { password, confirmPassword } = req.body
		if (!(password === confirmPassword))
			return res.status(405).json({ message: 'Password do not match' })
		return next()
	}
	passwordRegexMatch = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { password } = req.body

		const { error, errors } = await passwordRegex(password)
		if (error) return res.status(405).json({ message: errors })

		return next()
	}
}

export const formValidator = new FormValidator()
