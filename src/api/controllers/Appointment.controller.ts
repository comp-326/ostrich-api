/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express'
import { RequestType } from './types'
export const createAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	return res.status(200).json({ message: 'Register' })
	// } catch (e) {
	// next(e)
	// }
}
export const cancelAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Cancelling appoinment' })
	// } catch (e) {
	// next(e)
	// }
}
export const updateAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Updating appointment' })
	// } catch (e) {
	// next(e)
	// }
}

export const rescheuleAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Rescheduling appointment' })
	// } catch (e) {
	// next(e)
	// }
}
