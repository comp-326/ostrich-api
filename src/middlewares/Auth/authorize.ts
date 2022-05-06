import { INext, IRequest, IResponse, JWTPayloadType } from '@ostrich-app/common/types';
import { NextFunction, Response } from 'express';
import { Model } from 'mongoose';
import Permissions from '@ostrich-app/constants/permissions';
import RoleModel from '@ostrich-app/features/userRoles/models';
import TokenGEN from '@ostrich-app/helpers/tokenGEN';
import UserModel from '@ostrich-app/features/users/models';
import { environmentConfig } from '@ostrich-app/config';
import jwt from 'jsonwebtoken';

class AuthMiddleware{
	constructor(private role: typeof Model, private user: typeof Model){}

	validateIsAccountActive = async (
		req: IRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { email } = req.body;
			const user = await this.user.findOne({ email });
			if (!user.isActive) 
				return res.status(401).json('Please activate your account');
			
			return next();
		} catch (error) {
			return next(error);
		}
	};

	verifyCookie = (req: IRequest, res: IResponse, next: INext) => {
		try {
			if (!req.cookies) {
				return res.status(401).json({
					message: 'Please login to access this page',
					status: 'warning',
					statusCode: 401,
					data: {}
				});
			}
			const token = req.cookies['access_token'];
			if (!token) {
				return res.status(401).json({
					message: 'Please login to access this page',
					status: 'warning',
					statusCode: 401,
					data: {}
				});
			}
			const jwtToken = TokenGEN.decodeToken(token);
			if (!jwtToken) {
				return res.status(401).json({
					message: 'Please login to access this page',
					status: 'warning',
					statusCode: 401,
					data: {}
				});
			}
			const payload = jwt.verify(
				jwtToken,
				environmentConfig.SECRET_KEY
			) as JWTPayloadType;
			req.user = payload;

			return next();
		} catch {
			return res.status(401).json({
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
					return res.status(401).json({
						message: 'Please activate your account',
						status: 'warning',
						statusCode: 401,
						data: {}
					});
				}
				const role = await this.role.findById(user.role);
				const permitted = await role.hasPermission(Permissions.USER);
				if (!permitted) 
					return res.sendStatus(403);
				
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
				if (!permitted) 
					return res.sendStatus(403);
				
				return next();
			});
		} catch (error) {
			return next(error);
		}
	};
}
export default new AuthMiddleware(RoleModel, UserModel);
