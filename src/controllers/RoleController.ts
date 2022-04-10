import { NextFunction, Response } from "express"
import {Model} from "mongoose"
import IRequest from "../common/interfaces/request"
import RoleModel from "./../models/RoleModel"
class RoleController {
	/**
	 *
	 * @param {Model} role
	 */
	constructor(private role:typeof Model) {}
	/**
	 ****************** INSERT ROLES *******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	createRoles = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			await RoleModel.InsertRoles()
			const roles = await this.role.find()
			if (roles) {
				return res
					.status(200)
					.json({ message: "Roles creation success", roles })
			}
			return res
				.status(200)
				.json({ message: "Roles creation failed", roles: null })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ****************** GET SPECIFIC ROLE BY ID *******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getRoleById = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const role = await this.role.findById(req.params.id)
			if (role) {
				return res
					.status(200)
					.json({ message: "Successful query", role })
			}
			return res
				.status(200)
				.json({ message: "Role not found", roles: null })
		} catch (error) {
			return next(error)
		}
	}
	/**
	 ****************** GET A LIST OF ALL ROLES *******************
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns
	 */
	getRoles = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const roles = await this.role.find()
			if (roles) {
				return res
					.status(200)
					.json({ message: "Successful query", roles })
			}
			return res
				.status(200)
				.json({ message: "No roles available", roles: null })
		} catch (error) {
			return next(error)
		}
	}
}

export default new RoleController(RoleModel)
