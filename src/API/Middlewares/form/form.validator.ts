/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response, NextFunction } from "express"
import ErrorResponse from "../../../Middlewares/error"

/**
 * On booking appointment the user must provide
 * appointment title/theme
 */
export const emptyAppointmentTitle = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { title }: { title: string | undefined } = req.body
		if (!title)
			return next(new ErrorResponse("Appointment title field required", 400))
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
			throw new ErrorResponse("Appointment intakeId field required", 400)
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
			throw new ErrorResponse("Appointment phone number field required", 400)
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
			throw new ErrorResponse("Appointment meeting link field required", 400)
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
			throw new ErrorResponse("Appointment meetingDuration field required", 400)
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
				"Appointment meetingStartTime field required",
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
				"Appointment meeting Category field required",
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
		if (!name) throw new ErrorResponse("Workspace name field required", 400)
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
		if (!comment) throw new ErrorResponse("You cannot post empty comment", 400)
		return next()
	} catch (e) {
		return next(e)
	}
}
