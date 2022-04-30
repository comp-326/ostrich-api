import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { Model } from 'mongoose';
import { INext, IRequest, IResponse, JWTPayloadType } from '@ostrich-common/types';
import { environmentConfig } from '@ostrich-config';
import Permissions from '@ostrich-constants/permissions';
import UserModel from '@ostrich-models/Users/UserModel';
import RoleModel from '@ostrich-models/Roles/RoleModel';
import { ExpressError } from '@ostrich-common/errors/ExpressError';
import TokenGEN from '@ostrich/src/helpers/tokenGEN';

class AuthMiddleware {
	constructor(private role: typeof Model, private user: typeof Model) {}

	validateIsAccountActive = async (
		req: IRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { email } = req.body;
			const user = await this.user.findOne({ email });
			if (!user.isActive) {
				return res.status(401).json('Please activate your account');
			}
			return next();
		} catch (error) {
			return next(error);
		}
	};
	verifyCookie = (req: IRequest, res: IResponse, next: INext) => {
		if (!req.cookies) {
			throw new ExpressError({
				message: 'Please login to access this page',
				status: 'warning',
				statusCode: 401,
				data: {}
			});
		}
		const token = req.cookies['access_token'];
		if (!token) {
			throw new ExpressError({
				message: 'Please login to access this page',
				status: 'warning',
				statusCode: 401,
				data: {}
			});
		}
		const jwtToken = TokenGEN.decodeToken(token);
		if (!jwtToken) {
			throw new ExpressError({
				message: 'Please login to access this page',
				status: 'warning',
				statusCode: 401,
				data: {}
			});
		}
		try {
			const payload = jwt.verify(jwtToken, environmentConfig.SECRET_KEY) as JWTPayloadType;
			req.user = payload;
			return next();
		} catch {
			throw new ExpressError({
				message: 'Login session has expired',
				status: 'warning',
				statusCode: 401,
				data: {}
			});
		}
	};

	loginRequired = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			this.verifyCookie(req, res, async () => {
				const user = await this.user.findById(req.user.userId);
				if (!user.isActive) {
					throw new ExpressError({
						message: 'Please activate your account',
						status: 'warning',
						statusCode: 401,
						data: {}
					});
				}
				const role = await this.role.findById(user.role);
				const permitted = await role.hasPermission(Permissions.USER);
				if (!permitted) {
					return res.sendStatus(403);
				}
				return next();
			});
		} catch (error) {
			return next(error);
		}
	};
	adminRequired = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			this.loginRequired(req, res, async () => {
				const user = await this.user.findById(req.user.userId);
				const role = await this.role.findById(user.role);
				const permitted = await role.hasPermission(Permissions.ADMIN);
				if (!permitted) {
					return res.sendStatus(403);
				}
				return next();
			});
		} catch (error) {
			return next(error);
		}
	};
}
export default new AuthMiddleware(RoleModel, UserModel);
