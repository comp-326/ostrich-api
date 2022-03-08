/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoleModel } from "../models/index"
import { Response, NextFunction } from "express"
import { IRequest } from "../types/request"
class Role {
	insertRoles = async (req: IRequest, res: Response, next: NextFunction) => {
		await RoleModel.insertRoles()
		const roles = await RoleModel.find()
		return res.status(200).json({ roles })
	}

	allRoles = async (req: IRequest, res: Response, next: NextFunction) => {
		const roles = await RoleModel.find()
		if (roles.length < 1) {
			return res.status(404).json({ message: "Not found" })
		}
		return res.status(200).json({ roles })
	}
	resetRoles = async function (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) {
		const roles = await RoleModel.find()
		if (!(roles.length > 1)) {
			return res
				.status(404)
				.json({ success: false, message: "No roles found" })
		}
		roles.forEach(
			async (role) =>
				await RoleModel.findByIdAndDelete(role._id, { new: true }),
		)

		return res
			.status(200)
			.json({
				success: true,
				message: "Roles deleted successfully",
				roles,
			})
	}
}

export default Role
