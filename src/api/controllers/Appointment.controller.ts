/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from 'express'
import Appointment from 'src/model/Appointment.Model'
import { RequestType } from './types'
export const createAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const newAppointment = new Appointment({
			...req.body,
			author: req.user.userId,
		})
		const savedAppointment = await newAppointment.save()
		return res.status(200).json({
			message: 'New Appointment created',
			success: true,
			appointment: savedAppointment,
		})
	} catch (error) {
		return next(error)
	}
}
export const cancelAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const appointment = await Appointment.findByIdAndUpdate(
			req.params.appointmentId,
			{ status: 'cancelled' },
			{ new: true },
		)
		return res.status(200).json({
			message: 'Appointment cancelled',
			appointment,
			success: true,
		})
	} catch (error) {
		return next(error)
	}
}
export const updateAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	// try {
	return res.status(200).json({ message: 'Updating appointment' })
	// } catch (error) {
	// next(error)
	// }
}

export const rescheduleAppointment = async (
	req: RequestType,
	res: Response,
	next: NextFunction,
) => {
	try {
		const appointment = await Appointment.findByIdAndUpdate(
			{ ...req.body },
			{ new: true },
		)
		return res.status(200).json({
			message: 'Updated succesfully',
			success: true,
			appointment,
		})
	} catch (error) {
		next(error)
	}
}
