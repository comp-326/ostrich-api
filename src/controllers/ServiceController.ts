/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response } from "express"
import ServiceModel from "../models/ServiceModel"
import { Model } from "mongoose"
import IRequest from "../common/interfaces/request"
import UserModel from "../models/UserModel"
import WorkspaceModel from "../models/WorkspaceModel"

class ServiceController {
	constructor(
		private service: typeof Model,
		private user: typeof Model,
		private workspace: typeof Model,
	) {}
	createService = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { workspaceId } = req.params
			if (!(req.user.userId && workspaceId)) {
				return res.status(400).json({
					success: false,
					errorMesssage: "Workspace and owner id required",
				})
			}
			const user = await this.user.findById(req.user.userId)
			const service = await this.service.create({
				...req.body,
				owner: user!._id,
			})
			if (service) {
				const workspace = await this.workspace.findById(workspaceId)

				await workspace.updateOne({ $push: { services: service._id } })
				return res
					.status(200)
					.json({ success: true, message: "Service creation successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Service creation failed" })
		} catch (error) {
			return next(error)
		}
	}
	getService = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const service = await this.user.findById(id)
			if (service) {
				return res.status(200).json({ success: true, service })
			}
			return res
				.status(200)
				.json({ success: false, message: "Service not found" })
		} catch (error) {
			return next(error)
		}
	}
	getServices = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			// const { workspaceId}=req.params
			const services = await this.user.find({}).limit(20)
			if (services.length > 0) {
				return res.status(200).json({ success: true, services })
			}
			return res
				.status(200)
				.json({ success: false, message: "Services not found" })
		} catch (error) {
			return next(error)
		}
	}
	deleteService = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { workspaceId, serviceId } = req.params
			const service = await this.service.findById(serviceId)
			if (service) {
				const workspace = await this.workspace.findById(workspaceId)
				await workspace.updateOne({ $pull: { services: service._id } })
				await service.deleteOne()
				return res
					.status(200)
					.json({ success: true, message: "Service deletion successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Service deletion failed" })
		} catch (error) {
			return next(error)
		}
	}

	updateService = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const { serviceId } = req.params
			const service = await this.workspace.findById(serviceId)
			if (service) {
				await service.updateOne({ ...req.body })
				return res
					.status(200)
					.json({ success: true, message: "Service update successful" })
			}
			return res
				.status(200)
				.json({ success: false, message: "Service update failed" })
		} catch (error) {
			return next(error)
		}
	}
}

export default new ServiceController(ServiceModel, UserModel, WorkspaceModel)
