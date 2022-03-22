import AvailabilityModel from "../models/AvailabilityModel"
import { NextFunction, Response } from "express"
import IRequest from "../common/interfaces/request"
import { Model } from "mongoose"

class AvailabilityController {
	constructor(private availability: typeof Model) {}
	createAvailability = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const availability = await this.availability.create({
				...req.body,
				user: req.user.userId,
			})
			const user = this.availability
				.findByIdAndUpdate(req.user.userId, {
					$push: { availability: availability._id },
				})
				.populate("availability", "availability")
			return res.status(200).json({
				success: true,
				user,
				message: "Sucessfully added your availability",
			})
		} catch (error) {
			return next(error)
		}
	}
	deleteAvailability = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const availabilityId = req.params.availabilityId
			await AvailabilityModel.findByIdAndDelete(availabilityId)
			this.availability
				.findByIdAndUpdate(req.user.userId, {
					$pull: { availability: availabilityId },
				})
				.populate("availability", "availability")
				.exec(async function (err, user) {
					if (err) {
						return next(err)
					}
					return res.status(200).json({
						success: true,
						user,
						message: "Sucessfully deleted your availability",
					})
				})
		} catch (error) {
			next(error)
		}
	}
}

export default new AvailabilityController(AvailabilityModel)
