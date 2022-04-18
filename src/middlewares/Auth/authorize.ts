import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { Model } from 'mongoose';
import { INext, IRequest, IResponse, JWTPayloadType } from '@common/types';
import { SECRET_KEY } from '@base/src/config';
import Permissions from '@root/constants/permissions';
import UserModel from '@root/models/Users/UserModel';
import RoleModel from '@root/models/Roles/RoleModel';
import { ExpressError } from '@base/src/common/errors/ExpressError';
import TokenGEN from '@base/src/helpers/TokenGEN';

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
	loginRequired = (req: IRequest, res: IResponse, next: INext) => {
		console.log('Cookies', req.cookies);
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
			const payload = jwt.verify(jwtToken, SECRET_KEY) as JWTPayloadType;
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

	verifyJwt = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			const AuthHeader = req.headers['authorization'];
			if (!AuthHeader) {
				return res.status(401).json('Please provide an auth token');
			}
			const token = AuthHeader.split(' ')[1];
			if (!token) {
				return res.status(401).json('Please provide an auth token');
			}
			return jwt.verify(token, SECRET_KEY, async (error, payload) => {
				if (error) {
					return res.status(401).redirect('/auth/login');
				}
				const decodedPayload = payload as JWTPayloadType;
				req.user = decodedPayload;
				return next();
			});
		} catch (error) {
			return next(error);
		}
	};

	// loginRequired = async (req: IRequest, res: Response, next: NextFunction) => {
	// 	try {
	// 		this.verifyJwt(req, res, async () => {
	// 			const user = await this.user.findById(req.user.userId);
	// 			const role = await this.role.findById(user.role);
	// 			const permitted = await role.hasPermission(Permissions.USER);
	// 			if (!permitted) {
	// 				return res.status(403).json({ errorMessage: 'Forbidden' });
	// 			}
	// 			return next();
	// 		});
	// 	} catch (error) {
	// 		return next(error);
	// 	}
	// };
	adminRequired = async (req: IRequest, res: Response, next: NextFunction) => {
		try {
			this.loginRequired(req, res, async () => {
				const user = await this.user.findById(req.user.userId);
				const role = await this.role.findById(user.role);
				const permitted = await role.hasPermission(Permissions.ADMIN);
				if (!permitted) {
					return res.status(403).json({ errorMessage: 'Forbidden' });
				}
				return next();
			});
		} catch (error) {
			return next(error);
		}
	};
}
export default new AuthMiddleware(RoleModel, UserModel);
