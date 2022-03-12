import { NextFunction, Response } from "express"
import { AppointmentModel } from "./../models"
import { IRequest } from "./../types/request.d"
class Appointment {
	createAppointment = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const appointment = await AppointmentModel.create({ ...req.body })
			if (appointment) {
				return res
					.status(200)
					.json({ success: true, message: "Appointment created successfully" })
			}
			return res
				.status(400)
				.json({ success: false, message: "Could not create appointment" })
		} catch (error) {
			return next(error)
		}
	}
	updateAppoinment = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const appointment = await AppointmentModel.findByIdAndUpdate(
				req.params.id,
				{ ...req.body },
			)
			if (appointment) {
				return res
					.status(200)
					.json({ success: true, message: "Appointment updated successfully" })
			}
			return res
				.status(400)
				.json({ success: false, message: "Could not create appointment" })
		} catch (error) {
			return next(error)
		}
	}
	cancelAppointment = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const appointment = await AppointmentModel.findByIdAndUpdate(
				req.params.id,
				{ status: "calcelled" },
			)
			if (appointment) {
				return res
					.status(200)
					.json({ success: true, message: "Appointment created successfully" })
			}
			return res
				.status(400)
				.json({ success: false, message: "Could not create appointment" })
		} catch (error) {
			return next(error)
		}
	}
	deleteAppointment = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const appointment = await AppointmentModel.findById(req.params.id)
			if (appointment) {
				await appointment.deleteOne()
				return res
					.status(200)
					.json({ success: true, message: "Appointment deleted successfully" })
			}
			return res
				.status(400)
				.json({ success: false, message: "Could not delete appointment" })
		} catch (error) {
			return next(error)
		}
	}
}

export default Appointment
