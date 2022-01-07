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
//Password is not empty
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
//Appointment title
export const emptyAppointmentTitle = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { title }: { title: string | undefined } = req.body
		if (!title)
			throw new ErrorResponse('Appointment title field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
//IntakeId present
export const emptyAppointmentIntakeId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { intakeId }: { intakeId: string | undefined } = req.body
		if (!intakeId)
			throw new ErrorResponse('Appointment intakeId field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}

//IntakeId present
export const emptyAppointmentIntakePhoneNumber = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { phoneNumber }: { phoneNumber: string | undefined } = req.body
		if (!phoneNumber)
			throw new ErrorResponse(
				'Appointment phone number field required',
				400,
			)
		return next()
	} catch (e) {
		return next(e)
	}
}

//Meeting link
export const emptyAppointmentMeetingLink = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { meetingLink }: { meetingLink: string | undefined } = req.body
		if (!meetingLink)
			throw new ErrorResponse(
				'Appointment meeting link field required',
				400,
			)
		return next()
	} catch (e) {
		return next(e)
	}
}
//Meeting duration
export const emptyAppointmentDuration = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { meetingDuration }: { meetingDuration: string | undefined } =
			req.body
		if (!meetingDuration)
			throw new ErrorResponse(
				'Appointment meetingDuration field required',
				400,
			)
		return next()
	} catch (e) {
		return next(e)
	}
}
//Start time
export const emptyAppointmentStartTime = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { meetingStartTime }: { meetingStartTime: string | undefined } =
			req.body
		if (!meetingStartTime)
			throw new ErrorResponse(
				'Appointment meetingStartTime field required',
				400,
			)
		return next()
	} catch (e) {
		return next(e)
	}
}

//Meeting duration
export const emptyAppointmentCategory = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { meetingCategory }: { meetingCategory: string | undefined } =
			req.body
		if (!meetingCategory)
			throw new ErrorResponse(
				'Appointment meeting Category field required',
				400,
			)
		return next()
	} catch (e) {
		return next(e)
	}
}

//Workspace name
export const emptyWorkspaceName = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name }: { name: string | undefined } = req.body
		if (!name) throw new ErrorResponse('Workspace name field required', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
//Comment body
export const emptyCommentBody = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { comment }: { comment: string | undefined } = req.body
		if (!comment)
			throw new ErrorResponse('You cannot post empty comment', 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
