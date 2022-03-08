import jwt from "jsonwebtoken"
import { IRequest } from "./../types/request.d"
import { NextFunction, Response } from "express"
import { SECRET_KEY } from "./../config"
import AuthPermissions from "./middlewares/AuthPermissions"
class JwtAuth {
	private permissions: AuthPermissions = new AuthPermissions()
	loginRequired = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const AuthHeader = req.headers.authorization
			if (!AuthHeader) {
				return res.status(400).json({
					success: false,
					message: "Auth header not provided",
				})
			}
			const authToken = AuthHeader.split(" ")[1]
			return jwt.verify(authToken, SECRET_KEY, async (err, payload) => {
				if (err) {
					return res
						.status(401)
						.json({ success: false, message: "Not authenticated" })
				}
				req.user = payload
				return next()
			})
		} catch (error) {
			return next(error)
		}
	}

	userRequired = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		this.loginRequired(req, res, () => {
			this.permissions.isUser(req, res, next)
		})
	}
	creatorRequired = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		this.loginRequired(req, res, () => {
			this.permissions.isCreator(req, res, next)
		})
	}
	creatorLiteRequired = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		this.loginRequired(req, res, () => {
			this.permissions.isCreatorLite(req, res, next)
		})
	}
	adminRequired = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		this.loginRequired(req, res, () => {
			this.permissions.isAdmin(req, res, next)
		})
	}
	superAdminRequired = async (
		req: IRequest,
		res: Response,
		next: NextFunction,
	) => {
		this.loginRequired(req, res, () => {
			this.permissions.isSuperAdmin(req, res, next)
		})
	}

}

export default JwtAuth
