import jwt from "jsonwebtoken"
import {SECRET_KEY} from "./../config"
import Permissions from "../constants/Permissions"
import IRequest from "../common/interfaces/request"
import { NextFunction, Response } from "express"
import {Model} from "mongoose"
import RoleModel from "../models/RoleModel"
import UserModel from "../models/UserModel"
import { JWTPayloadType } from "../common/UserPayloadType"

class AuthMiddleware {
	constructor(private role:typeof Model,private user:typeof Model) {}
		
	validateIsAccountActive = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const { email } = req.body
			const user = await this.user.findOne({ email })
			if (!user.isActive) {
				return res.status(401).json("Please activate your account")
			}
			return next()
		} catch (error) {
			return next(error)
		}
	}
	verifyJwt = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			const AuthHeader = req.headers["authorization"]
			if (!AuthHeader) {
				return res.status(401).json("Please provide an auth token")
			}
			const token = AuthHeader.split(" ")[1]
			if (!token) {
				return res.status(401).json("Please provide an auth token")
			}
			return jwt.verify(token, SECRET_KEY, async (error, payload) => {
				if (error) {
					return res.status(401).redirect("/auth/login")
				}
				const decodedPayload = payload as JWTPayloadType
				req.user = decodedPayload
				return next()
			})
		} catch (error) {
			return next(error)
		}
	}
	loginRequired = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			this.verifyJwt(req, res, async () => {
				const user = await this.user.findById(req.user.userId)
				const role = await this.role.findById(user.role)
				const permitted = await role.hasPermission(Permissions.USER)
				if (!permitted) {
					return res.status(403).json("Forbidden")
				}
				return next()
			})
		} catch (error) {
			return next(error)
		}
	}
	adminRequired = async (req:IRequest, res:Response, next:NextFunction) => {
		try {
			this.verifyJwt(req, res, async () => {
				const user = await this.user.findById(req.user.userId)
				const role = await this.role.findById(user.role)
				const permitted = await role.hasPermission(Permissions.ADMIN)
				if (!permitted) {
					return res.status(403).json("Forbidden")
				}
				return next()
			})
		} catch (error) {
			return next(error)
		}
	}
}
export default new AuthMiddleware(RoleModel, UserModel)