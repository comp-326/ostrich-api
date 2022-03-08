import { Permission } from "./../../models"
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, NextFunction } from "express"
import { IRequest } from "./../../types/request"
import SiteRoles from "./SiteRoles"
import ExpressError from "./../../errors/errorRequest"

class AuthPermissions {
	private roles: SiteRoles = new SiteRoles()
	isUser = async (req: IRequest, res: Response, next: NextFunction) => {
		const { hasPermission } = await this.roles.can(
			req.user.userId,
			Permission.USER,
		)
		if (hasPermission) {
			return next()
		}
		return next(new ExpressError("Forbidden", 403))
	}
	isCreator = async (req: IRequest, res: Response, next: NextFunction) => {
		const { hasPermission } = await this.roles.can(
			req.user.userId,
			Permission.CREATOR,
		)
		if (hasPermission) {
			return next()
		}
		return next(new ExpressError("Forbidden", 403))
	}
	isCreatorLite = async (req: IRequest, res: Response, next: NextFunction) => {
		const { hasPermission } = await this.roles.can(
			req.user.userId,
			Permission.CREATOR_LITE,
		)
		if (hasPermission) {
			return next()
		}
		return next(new ExpressError("Forbidden", 403))
	}
	isAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
		const { hasPermission } = await this.roles.can(
			req.user.userId,
			Permission.ADMIN,
		)
		if (hasPermission) {
			return next()
		}
		return next(new ExpressError("Forbidden", 403))
	}
	isSuperAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
		const { hasPermission } = await this.roles.can(
			req.user.userId,
			Permission.SUPER_ADMIN,
		)
		if (hasPermission) {
			return next()
		}
		return next(new ExpressError("Forbidden", 403))
	}
}

export default AuthPermissions
